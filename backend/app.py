import os
import joblib
import pickle
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ─── Model paths (relative to this file) ────────────────────────────────────
BASE = os.path.dirname(os.path.abspath(__file__))
PARENT = os.path.dirname(BASE)

MODEL_PATHS = {
    "irrigation": os.path.join(PARENT, "Irrigation_need", "stack_model_classifier.joblib"),
    "yield":      os.path.join(PARENT, "Yield",           "stack_Yield_model.joblib"),
    "market":     os.path.join(PARENT, "market_price",    "xgb_market_price.pkl"),
    "sustain":    os.path.join(PARENT, "Sustainability_score", "xgb_sustainable_score.pkl"),
    "crop":       os.path.join(PARENT, "Crop_recomendation",    "crop_recommendation.pkl"),
}

# ─── Load models once at startup ─────────────────────────────────────────────
print("Loading models… (this may take a moment for large stacked models)")

models = {}
for key, path in MODEL_PATHS.items():
    print(f"  Loading {key} from {path} …")
    if path.endswith(".pkl"):
        with open(path, "rb") as f:
            models[key] = pickle.load(f)
    else:
        models[key] = joblib.load(path)
    print(f"  ✓ {key} loaded")

print("All models ready!\n")


# ─── Helper ──────────────────────────────────────────────────────────────────
def err(msg, code=400):
    return jsonify({"error": msg}), code

# ─── Categorical Mappings for Irrigation (based on train.csv) ──────────────
IRRIG_MAPS = {
    "Soil_Type":         {"Clay": 0, "Loamy": 1, "Sandy": 2, "Silt": 3},
    "Crop_Type":         {"Cotton": 0, "Maize": 1, "Potato": 2, "Rice": 3, "Sugarcane": 4, "Wheat": 5},
    "Crop_Growth_Stage": {"Flowering": 0, "Harvest": 1, "Sowing": 2, "Vegetative": 3},
    "Season":            {"Kharif": 0, "Rabi": 1, "Zaid": 2},
    "Irrigation_Type":   {"Canal": 0, "Drip": 1, "Rainfed": 2, "Sprinkler": 3},
    "Water_Source":      {"Groundwater": 0, "Rainwater": 1, "Reservoir": 2, "River": 3},
    "Region":            {"Central": 0, "East": 1, "North": 2, "South": 3, "West": 4},
}

def prepare_features(data, expected_features, model_key=None):
    row = {}
    for f in expected_features:
        if f in data:
            val = data[f]
            # Convert categorical strings to ints for irrigation if needed
            if model_key == "irrigation" and f in IRRIG_MAPS:
                row[f] = IRRIG_MAPS[f].get(str(val), 0)
            else:
                row[f] = val
        else:
            # Check if it's a one-hot encoded dummy feature e.g. "Crop_Type_Corn"
            matched = False
            for key, val in data.items():
                if isinstance(val, str) and f == f"{key}_{val}":
                    row[f] = 1
                    matched = True
                    break
            
            # Special case for "Mulching_Used_Yes" if the input is "Mulching_Used": "Yes"
            if not matched and f == "Mulching_Used_Yes" and data.get("Mulching_Used") == "Yes":
                row[f] = 1
                matched = True

            if not matched:
                row[f] = 0
    
    # Ensure correct column order
    df = pd.DataFrame([row])
    print(f"  Prepared row: {row}")
    return df[expected_features]

# ─── Endpoint 1: Irrigation Need ─────────────────────────────────────────────
@app.route("/predict/irrigation", methods=["POST"])
def predict_irrigation():
    data = request.get_json(force=True)
    print(f"--- POST /predict/irrigation ---")
    print(f"  Input: {data}")
    required = [
        "Soil_Type", "Soil_pH", "Soil_Moisture", "Organic_Carbon",
        "Electrical_Conductivity", "Temperature_C", "Humidity", "Rainfall_mm",
        "Sunlight_Hours", "Wind_Speed_kmh", "Crop_Type", "Crop_Growth_Stage",
        "Season", "Irrigation_Type", "Water_Source", "Field_Area_hectare",
        "Mulching_Used", "Previous_Irrigation_mm", "Region",
    ]
    missing = [k for k in required if k not in data]
    if missing:
        return err(f"Missing fields: {missing}")

    try:
        model = models["irrigation"]
        expected_features = list(model.feature_names_in_)
        df = prepare_features(data, expected_features, "irrigation")
        
        pred = model.predict(df)[0]

        proba = None
        if hasattr(model, "predict_proba"):
            proba_arr = model.predict_proba(df)[0]
            classes = list(model.classes_)
            proba = {str(c): float(round(p * 100, 1)) for c, p in zip(classes, proba_arr)}

        return jsonify({"prediction": str(pred), "probabilities": proba})
    except Exception as e:
        import traceback
        traceback.print_exc()
        return err(f"Prediction error: {str(e)}", 500)


# ─── Endpoint 2: Crop Yield ───────────────────────────────────────────────────
@app.route("/predict/yield", methods=["POST"])
def predict_yield():
    data = request.get_json(force=True)
    print(f"--- POST /predict/yield ---")
    print(f"  Input: {data}")
    required = [
        "agro_ecological_zone", "region_type", "farm_size_ha",
        "soil_quality_index", "rainfall_mm_annual", "household_size",
        "market_distance_km", "livestock_tlu", "extension_access",
        "fertilizer_use_kg_ha", "rainfall_mm_season",
    ]
    missing = [k for k in required if k not in data]
    if missing:
        return err(f"Missing fields: {missing}")

    try:
        model = models["yield"]
        expected_features = list(model.feature_names_in_)
        df = prepare_features(data, expected_features, "yield")
        
        pred = float(model.predict(df)[0])
        return jsonify({"prediction": round(pred, 2), "unit": "kg/ha"})
    except Exception as e:
        import traceback
        traceback.print_exc()
        return err(f"Prediction error: {str(e)}", 500)


# ─── Endpoint 3: Market Price ─────────────────────────────────────────────────
@app.route("/predict/market", methods=["POST"])
def predict_market():
    data = request.get_json(force=True)
    print(f"--- POST /predict/market ---")
    print(f"  Input: {data}")
    required = [
        "Product", "Demand_Index", "Supply_Index",
        "Competitor_Price_per_ton", "Economic_Indicator",
        "Weather_Impact_Score", "Seasonal_Factor", "Consumer_Trend_Index",
    ]
    missing = [k for k in required if k not in data]
    if missing:
        return err(f"Missing fields: {missing}")

    try:
        model = models["market"]
        expected_features = list(model.feature_names_in_)
        df = prepare_features(data, expected_features, "market")
        
        pred = float(model.predict(df)[0])
        return jsonify({"prediction": round(pred, 2), "unit": "USD/ton"})
    except Exception as e:
        import traceback
        traceback.print_exc()
        return err(f"Prediction error: {str(e)}", 500)


# ─── Endpoint 4: Sustainability Score ────────────────────────────────────────
@app.route("/predict/sustainability", methods=["POST"])
def predict_sustainability():
    data = request.get_json(force=True)
    print(f"--- POST /predict/sustainability ---")
    print(f"  Input: {data}")
    required = [
        "Soil_pH", "Soil_Moisture", "Temperature_C", "Rainfall_mm",
        "Crop_Type", "Fertilizer_Usage_kg", "Pesticide_Usage_kg", "Crop_Yield_ton",
    ]
    missing = [k for k in required if k not in data]
    if missing:
        return err(f"Missing fields: {missing}")

    try:
        model = models["sustain"]
        expected_features = list(model.feature_names_in_)
        df = prepare_features(data, expected_features, "sustain")
        
        pred = float(model.predict(df)[0])
        pred = max(0.0, min(100.0, pred))  # clamp to [0, 100]
        return jsonify({"prediction": round(pred, 2), "unit": "score (0-100)"})
    except Exception as e:
        import traceback
        traceback.print_exc()
        return err(f"Prediction error: {str(e)}", 500)


# ─── Endpoint 5: Crop Recommendation ──────────────────────────────────────────
@app.route("/predict/crop", methods=["POST"])
def predict_crop():
    data = request.get_json(force=True)
    print(f"--- POST /predict/crop ---")
    print(f"  Input: {data}")
    
    # Map Nitrogen, Phosphorus, Potassium to the model's preferred names if necessary
    # The model expects: Nitrogen, Phosphorus, Potassium, Temperature, Humidity, pH_Value, Rainfall
    required = ["Nitrogen", "Phosphorus", "Potassium", "Temperature", "Humidity", "pH_Value", "Rainfall"]
    
    missing = [k for k in required if k not in data]
    if missing:
        return err(f"Missing fields: {missing}")

    try:
        model = models["crop"]
        # Convert numbers to float just in case
        for k in required:
            data[k] = float(data[k])
            
        expected_features = list(model.feature_names_in_)
        df = prepare_features(data, expected_features, "crop")
        
        pred_idx = int(model.predict(df)[0])
        
        # Standard Kaggle Crop Dataset Mapping
        crops = {
            0: 'apple', 1: 'banana', 2: 'blackgram', 3: 'chickpea', 4: 'coconut',
            5: 'coffee', 6: 'cotton', 7: 'grapes', 8: 'jute', 9: 'kidneybeans',
            10: 'lentil', 11: 'maize', 12: 'mango', 13: 'mothbeans', 14: 'mungbean',
            15: 'muskmelon', 16: 'orange', 17: 'papaya', 18: 'pigeonpeas',
            19: 'pomegranate', 20: 'rice', 21: 'watermelon'
        }
        
        crop_name = crops.get(pred_idx, "Unknown")
        
        # Get probabilities if possible
        top_3 = []
        if hasattr(model, "predict_proba"):
            probs = model.predict_proba(df)[0]
            top_indices = np.argsort(probs)[-3:][::-1]
            for idx in top_indices:
                top_3.append({
                    "crop": crops.get(idx, "Unknown"),
                    "confidence": float(round(probs[idx] * 100, 1))
                })

        return jsonify({
            "prediction": crop_name,
            "top_suggestions": top_3,
            "id": pred_idx
        })
    except Exception as e:
        import traceback
        traceback.print_exc()
        return err(f"Prediction error: {str(e)}", 500)


# ─── Health check ─────────────────────────────────────────────────────────────
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "models_loaded": list(models.keys())})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
