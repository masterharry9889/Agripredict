# AgriPredict — ML Prediction Web Application

A full-stack web application that exposes four agricultural ML models through a beautiful animated interface, enabling users to get real-time predictions for Irrigation Need, Crop Yield, Market Price, and Sustainability Score.

---

## Proposed Architecture

```
d:\Agriculture\
├── backend/          ← Flask REST API (Python)
│   ├── app.py
│   └── requirements.txt
└── frontend/         ← Vite + React (Node.js)
    ├── src/
    │   ├── App.jsx
    │   ├── components/
    │   │   ├── HeroSection.jsx
    │   │   ├── PredictionCard.jsx
    │   │   ├── forms/
    │   │   │   ├── IrrigationForm.jsx
    │   │   │   ├── YieldForm.jsx
    │   │   │   ├── MarketPriceForm.jsx
    │   │   │   └── SustainabilityForm.jsx
    │   │   └── ResultDisplay.jsx
    │   └── index.css
    ├── index.html
    └── package.json
```

---

## Four Prediction Modules

### 1. 🌊 Irrigation Need (Classification)
- **Model**: `stack_model_classifier.joblib` (stacked Decision Tree + Random Forest)
- **Output**: `Low` / `Medium` / `High`
- **Inputs**: Soil_Type, Soil_pH, Soil_Moisture, Organic_Carbon, Electrical_Conductivity, Temperature_C, Humidity, Rainfall_mm, Sunlight_Hours, Wind_Speed_kmh, Crop_Type, Crop_Growth_Stage, Season, Irrigation_Type, Water_Source, Field_Area_hectare, Mulching_Used, Previous_Irrigation_mm, Region

### 2. 🌽 Crop Yield (Regression)
- **Model**: `stack_Yield_model.joblib` (stacked: Linear + MLP + SVR + DT + RF + XGBoost)
- **Output**: `maize_yield_kg_ha` (float)
- **Inputs**: agro_ecological_zone, region_type, farm_size_ha, soil_quality_index, rainfall_mm_annual, household_size, market_distance_km, livestock_tlu, extension_access, fertilizer_use_kg_ha, rainfall_mm_season

### 3. 💰 Market Price (Regression)
- **Model**: `xgb_market_price.pkl` (XGBoost)
- **Output**: `Market_Price_per_ton` (float)
- **Inputs**: Product, Demand_Index, Supply_Index, Competitor_Price_per_ton, Economic_Indicator, Weather_Impact_Score, Seasonal_Factor, Consumer_Trend_Index

### 4. 🌱 Sustainability Score (Regression)
- **Model**: `xgb_sustainable_score.pkl` (XGBoost)
- **Output**: Score 0–100 (float)
- **Inputs**: Soil_pH, Soil_Moisture, Temperature_C, Rainfall_mm, Crop_Type, Fertilizer_Usage_kg, Pesticide_Usage_kg, Crop_Yield_ton

---

## Proposed Changes

### Backend — Flask API

#### [NEW] `backend/app.py`
- Flask app with CORS enabled (for React dev server)
- Loads all 4 models at startup using `joblib.load` / `pickle.load`
- 4 endpoints: `POST /predict/irrigation`, `/predict/yield`, `/predict/market-price`, `/predict/sustainability`
- Each endpoint accepts JSON, builds a DataFrame, runs model prediction, returns JSON result

#### [NEW] `backend/requirements.txt`
- `flask`, `flask-cors`, `joblib`, `scikit-learn`, `xgboost`, `pandas`, `numpy`

---

### Frontend — Vite + React

#### [NEW] `frontend/` (Vite React project)

**Design System (in `index.css`)**:
- Dark theme: deep forest greens, earthy browns, neon lime accents
- Glassmorphism cards with frosted blur effects
- Google Fonts: **Outfit** (headings) + **Inter** (body)
- CSS custom properties for the full color palette

**External Libraries**:
- `animejs` — Hero section particle animations, form submit animations, result reveal effect
- `react-countup` — Animated number counters for numeric outputs
- `framer-motion` — Page/tab transitions, card entrance animations
- `react-hot-toast` — Styled notifications for loading/error/success states

**Pages/Components**:
1. **Hero Section** — Animated particle field using Anime.js, floating crop icons, tagline "AI-Powered Agricultural Intelligence"
2. **Navigation Tabs** — 4 glowing tabs for each prediction module
3. **Prediction Form Cards** — Glassmorphism form cards with labeled inputs, sliders for numeric range values, dropdowns for categorical values
4. **Result Display** — Animated reveal card with large output value, color-coded badge (Low=green, Medium=yellow, High=red for irrigation), progress ring for sustainability score, chart-style for market price

---

## Visual Design

- **Theme**: Dark cosmic + organic earth tones
- **Hero BG**: Animated SVG particle grid (Anime.js staggered dots simulating crop field)
- **Cards**: `backdrop-filter: blur(16px)` glassmorphism, subtle green glow borders
- **Transitions**: Framer Motion `AnimatePresence` for tab switching
- **Micro-interactions**: Input focus glow pulse, submit button shimmer, result counter animation

---

## Open Questions

> [!IMPORTANT]
> **Categorical dropdown options**: I will use the values observed in the training data for dropdowns (e.g. Soil_Type: Sandy/Loamy/Clay/Silt; Crop_Type: Wheat/Rice/Sugarcane/etc.). Do you want me to extract the full unique value lists from the CSVs, or are default representative values fine?

> [!IMPORTANT]
> **Model loading time**: The stacked models are large (stack_model_classifier = ~520MB, stack_Yield_model = ~244MB). Loading them takes 5–15s at startup. Is that acceptable, or should I add lazy loading (load model only on first request)?

> [!NOTE]
> The backend runs on `http://localhost:5000` and the React frontend on `http://localhost:5173`. Both run locally — no deployment needed unless you request it.

---

## Verification Plan

1. Run `python backend/app.py` — confirm all 4 models load and all 4 endpoints respond to test POST requests
2. Run `npm run dev` in `frontend/` — confirm React app renders, forms submit, predictions display
3. Test each prediction form with sample values matching training data distribution
4. Visual check: animations play, glassmorphism renders correctly, responsive on different window sizes
