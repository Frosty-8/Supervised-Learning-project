# 🏠 House Price Predictor (Supervised Learning)

[![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-API-green?logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-UI-blue?logo=react)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

> 🧠 A supervised learning project for predicting house prices using **Linear Regression** and **Decision Tree Regression**, powered by **FastAPI** backend and **React** frontend with Vite.  
> 💻 Designed for educational purposes, showcasing model training, evaluation, and real-time predictions with a modern web interface.

---
## 📘 Project Overview

| **Feature** | **Description** |
|--------------|-----------------|
| 🎯 **Goal** | Predict house prices based on features like area, bedrooms, stories, and year built. |
| ⚙️ **Algorithms Used** | **Linear Regression** and **Decision Tree Regression** from Scikit-learn. |
| 💾 **Dataset** | Synthetic house data (~1000 rows) generated with Faker. |
| 🧮 **Tech Stack** | FastAPI • Scikit-learn • Pandas • NumPy • React • Vite • Tailwind CSS • Framer Motion • Recharts |
| 🧱 **Architecture** | Modular (Backend: API, Model, Data; Frontend: UI Components, Pages) |
| 🪟 **Compatibility** | Fully functional on Windows, Linux, and macOS. |

### 🔹 Objective
To build and deploy a supervised learning system that predicts house prices using regression models, with an interactive UI for model exploration and real-time predictions.

### 🔹 Approach
- Uses **Linear Regression** for linear relationships and **Decision Tree Regression** for non-linear patterns.
- Trains models on synthetic data (`house_data.csv`) with features: `area_sqft`, `bedrooms`, `stories`, `year_built`.
- Exports trained models to `.pkl` files using Joblib for persistence.
- Provides a **FastAPI backend** for training, prediction, and metrics.
- Features a **React frontend** with Vite, displaying metrics (R², MSE), charts, and a prediction interface.

---
### 💡 Key Features
- 🏠 Predicts house prices based on area, bedrooms, stories, and year built.
- ⚙️ Supports Linear Regression and Decision Tree Regression.
- 📊 Visualizes actual vs. predicted prices with Recharts.
- 💾 Saves trained models and metrics for reuse.
- 🎮 Interactive dashboard for algorithm switching and real-time predictions.
- 📚 Educational About page explaining supervised learning concepts.
- 🪄 Clean, modular structure (Backend: API, Model; Frontend: UI, Pages).

## Tech Stack

### Backend
- **Python 3.11**: Core language.
- **FastAPI**: API framework for endpoints.
- **Scikit-learn**: For ML models (LinearRegression, DecisionTreeRegressor).
- **Pandas & NumPy**: Data manipulation.
- **Joblib**: Model serialization.
- **Faker**: Synthetic data generation.
- **Matplotlib & Seaborn**: Plot generation (optional for saved plots).
- **Uvicorn**: ASGI server for running the API.
- **CORS Middleware**: Enabled for frontend integration.

### Frontend
- **React 19**: UI library.
- **Vite**: Build tool and dev server.
- **TypeScript**: Typed JavaScript.
- **Tailwind CSS**: Utility-first CSS framework.
- **Framer Motion**: Animations and transitions.
- **Recharts**: Charting library for visualizations.
- **React Router**: Routing for pages (Home, Dashboard, About).
- **Axios**: HTTP client for API calls.

### Other Tools
- **Poetry**: Dependency management (via pyproject.toml).
- **ESLint**: Linting for frontend.
- **Git**: Version control (assumed).

## Project Structure
```bash
📂 supervised-learning-project/
│
├── backend/
│   ├── 📝 README.md                # Backend-specific notes
│   ├── 🐍 main.py                 # FastAPI app with endpoints
│   ├── 📄 pyproject.toml          # Dependencies via Poetry
│   ├── 📋 requirements.txt        # Pip-installable dependencies
│   ├── 🐍 .python-version         # Specifies Python 3.11
│   ├── data/
│   │   ├── 📊 house_data.csv      # Synthetic dataset (~1000 rows)
│   │   └── 🐍 house_data.py       # Script to generate data
│   └── model/
│       ├── 🐍 __init__.py
│       ├── 🐍 trainer.py          # Model training logic
│       └── saved_models/          # Stores .pkl models and .json metrics
│
├── frontend/
│   ├── 📝 README.md               # Frontend-specific notes
│   ├── 🔍 eslint.config.js        # ESLint configuration
│   ├── 🌐 index.html             # Entry HTML
│   ├── 📦 package.json           # Dependencies
│   ├── 📜 tsconfig.app.json      # TypeScript config for app
│   ├── 📜 tsconfig.json          # Main TypeScript config
│   ├── 📜 tsconfig.node.json     # TypeScript config for Node
│   ├── ⚡ vite.config.ts          # Vite configuration
│   └── src/
│       ├── ⚛️ App.tsx            # Main app with routing and animations
│       ├── 🎨 index.css          # Global styles with Tailwind
│       ├── ⚛️ main.tsx           # React entry point
│       ├── components/
│       │   ├── 📉 ChartPanel.tsx     # Recharts-based line chart
│       │   ├── 🌟 Hero.tsx           # Hero section
│       │   ├── 📊 MetricCard.tsx     # Displays metrics like R²/MSE
│       │   ├── 🧭 Navbar.tsx         # Navigation bar
│       │   └── 🔮 PredictionPanel.tsx # Form for predictions
│       └── pages/
│           ├── 📚 About.tsx       # Educational content on ML concepts
│           ├── 📊 Dashboard.tsx   # Metrics, charts, and predictions
│           └── 🏠 Home.tsx        # Landing page with overview
│
├── requirements.txt
└── README.md
```


## Installation

### Prerequisites
- Python 3.11+
- Node.js 18+
- Git

### Backend Setup
1. Clone the repo:
```bash
git clone <repo-url>
cd supervised-learning-project/backend
```

2. Install dependencies:
- Using Poetry (recommended):
```bash
poetry install
```
- Or using pip:
```bash
pip install -r requirements.txt
```
- Generate data if needed (assumes `house_data.py` exists):
```bash
python data/house_data.py
```
- Run the API:
```bash
uvicorn main:app --reload --port 8000
```
- Access Swagger docs at `http://localhost:8000/docs`.

### Frontend Setup
1. Navigate to frontend:
```bash
cd ../frontend
```
2. Install dependencies:
```bash
npm install
```
3. Run the dev server:
```bash
npm run dev
```

- Access at `http://localhost:5173` (default Vite port).

## Usage

### Backend API Endpoints
- **GET /**: Health check (`{"message": "🏠 FastAPI backend running for House Price Predictor"}`).
- **POST /train?algorithm=<linear|tree>**: Train and save the model. Returns metrics.
- **GET /metrics?algorithm=<linear|tree>**: Get R² and MSE, plus sample predictions for charting.
- **POST /predict**: Predict price. Body: `{"algorithm": "linear", "area_sqft": 1200, "bedrooms": 3, "stories": 1, "year_built": 2010}`.
- **GET /plot/<actual_vs_pred|residuals>?algorithm=<linear|tree>**: Serve saved plots (if generated).

### Frontend Pages
- **Home (/)**: Introduction to supervised learning with animated UI and navigation to Dashboard.
- **Dashboard (/dashboard)**: Select algorithm, view metrics/cards, line chart (actual vs. predicted), and prediction form.
- **About (/about)**: In-depth explanations of supervised learning, regression models, evaluation metrics, and GATE notes.

### Example Workflow
1. Start backend and train models via API or Dashboard.
2. Use Dashboard to switch algorithms, view metrics/charts.
3. Enter features in Prediction Panel for real-time predictions.

## ML Details
- **Dataset**: Synthetic CSV with columns: house_id, area_sqft, bedrooms, bathrooms, stories, location, year_built, price.
- **Features Used**: area_sqft, bedrooms, stories, year_built.
- **Models**:
- Linear Regression: Simple, interpretable, assumes linear relationships.
- Decision Tree: Handles non-linearity, but prone to overfitting (tune hyperparameters in `trainer.py`).
- **Evaluation**: R² (variance explained), MSE (error magnitude).
- **Plots**: Optional saved PNGs for actual vs. predicted and residuals.

## Contributing
1. Fork the repo.
2. Create a feature branch: `git checkout -b feature/new-feature`.
3. Commit changes: `git commit -m 'Add new feature'`.
4. Push: `git push origin feature/new-feature`.
5. Open a Pull Request.

## License
MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgments
- Built for educational purposes.
- Inspired by ML tutorials and FastAPI/React best practices.
- Data generated with Faker for realism.

For issues, open a ticket or contact the maintainer.
