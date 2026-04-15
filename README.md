# 🌾 AgriPredict: AI Agricultural Intelligence Platform

AgriPredict is a premium, data-driven "Agri-Tech" command center designed to empower farmers and agricultural researchers with real-time predictive analytics. Built with a high-fidelity immersive UI, the platform integrates multiple Machine Learning kernels to provide actionable insights into irrigation, yield, market trends, and sustainability.

![AgriPredict Header](https://via.placeholder.com/1200x400/010409/10b981?text=AgriPredict+Mission+Control)

## 🚀 Key Features

- **🌐 3D Digital HUD**: An immersive landing page featuring a Three.js-powered particle field representing digital soil and kinetic typography.
- **💧 Smart Irrigation HUD**: Predictive modeling of irrigation requirements using a 19-parameter sub-surface analysis kernel.
- **📈 Yield Projection Engine**: Stacked Machine Learning models that forecast harvest potential based on NPK chemistry, climate data, and farm demographics.
- **💹 Market Intelligence**: Real-time price forecasting for major commodities using XGBoost, considering inflation, logistics, and competition.
- **🍃 Sustainability Audit**: Environmental impact scoring (0-100) that evaluates water usage, carbon footprint, and biodiversity health.
- **🌱 Genetic Crop Match**: Optimal cultivar recommendation based on soil pH, nutrient levels, and local precipitation.

## 🛠️ Tech Stack

### Frontend (Mission Control)
- **Framework**: React 19 + Vite
- **3D/Animation**: Three.js, React Three Fiber, Anime.js, Framer Motion
- **Icons**: Lucide-React
- **Styling**: Vanilla CSS with custom "Agri-Tech" design tokens and glassmorphism

### Backend (AI Kernel)
- **Server**: Flask (Python 3.9+)
- **Analysis**: Scikit-learn, XGBoost, Joblib
- **Data**: Pandas, NumPy
- **CORS**: Flask-CORS for secure cross-origin communication

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)

### 1. Initialize Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```
*The Flask server will start on `http://localhost:5000`*

### 2. Initialize Frontend
```bash
cd frontend
npm install
npm run dev
```
*The application will be accessible at `http://localhost:5173`*

## 📁 Repository Structure
```text
Agripredict/
├── backend/            # Flask API & ML Model Integration
│   ├── app.py          # Core API Logic
│   └── ...             # ML Kernel Files (.joblib, .pkl)
├── frontend/           # Vite + React Application
│   ├── src/
│   │   ├── components/ # Atomic UI Elements & 3D Effects
│   │   ├── pages/      # Landing & Command Center (Dashboard)
│   │   └── App.jsx     # Global Routing
│   └── index.css       # Premium Design System
└── README.md
```

## 🛡️ Security & Performance
- **Zero-Latency UI**: Optimized 3D rendering with React Three Fiber.
- **Robust Payloads**: Frontend strictly enforces data types (float/int) before kernel submission.
- **Defensive Routing**: Prevents UI crashes from malformed telemetry strings.

---
Developed with 💚 by the AgriPredict Dev Team.
