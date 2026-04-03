# Walkthrough: AgriPredict Web App

I have completely built the **AgriPredict** web application based on the 4 provided ML models. 

## Project Structure
The application is split into two parts:
1. **Flask API Backend** (`d:\Agriculture\backend\app.py`)
2. **Vite React Frontend** (`d:\Agriculture\frontend\`)

---

## 1. Backend (Flask)
I built a simple but robust HTTP server using Python Flask. At startup, the server loads the 4 pre-trained machine learning models:
- **Irrigation Need**: `stack_model_classifier.joblib` (Random Forest + Decision Tree Stack)
- **Crop Yield**: `stack_Yield_model.joblib` (6-regressor stack)
- **Market Price**: `xgb_market_price.pkl` (XGBoost Regressor)
- **Sustainability**: `xgb_sustainable_score.pkl` (XGBoost Regressor)

It exposes 4 endpoints:
- `POST /predict/irrigation`
- `POST /predict/yield`
- `POST /predict/market`
- `POST /predict/sustainability`

Each endpoint accepts JSON from the frontend, converts it into a pandas DataFrame, runs inference using the model, and returns a JSON response. 

---

## 2. Frontend (Vite + React)
I built a modern, highly interactive React application with the following key features:
- **Design System**: A fully customized CSS implementation (`index.css`) featuring a dark nature-inspired theme (glass layer effects, glowing neon green accents, and typography using *Outfit* and *Inter* fonts). 
- **Animations**: 
  - **Anime.js** drives the dynamic hero background with randomized organic dots.
  - **Framer Motion** powers smooth tab transitions and prediction card reveals.
  - **React CountUp** creates satisfying number-counting effects for the regression outputs.
- **Components**:
  - The prediction modules each have a dedicated form (e.g. `IrrigationForm.jsx`) with dropdowns prepopulated with unique categorical values from the original CSV data for maximum accuracy during inference.
  - The `ResultDisplay.jsx` dynamically shifts UI depending on the model (e.g., probability bars for classification vs. interactive SVG rings for the sustainability score).

---

## How it works
Both development servers are currently running in your terminal. You can preview the app using the local URLs:

- **Frontend Interface**: `http://localhost:5173/`
- **Backend API**: `http://localhost:5000/`

To use it:
1. Open the frontend URL in your browser.
2. Scroll down to the Prediction Modules.
3. Select a tab (e.g. "Irrigation Need").
4. Fill in the agricultural/environmental features.
5. Click "Predict" and watch the model calculate your answer in real-time!
