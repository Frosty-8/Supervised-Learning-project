from fastapi import FastAPI, Query
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os, json, joblib
import pandas as pd
from typing import Literal

app = FastAPI(title="🏠 House Price Predictor API")

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Load models (if exist)
def load_model(algorithm="linear"):
    path = f"model/saved_models/{algorithm}_model.pkl"
    if os.path.exists(path):
        return joblib.load(path)
    return None

# Load dataset for charting
DATA_PATH = "data/house_data.csv"
df = pd.read_csv(DATA_PATH) if os.path.exists(DATA_PATH) else None

@app.get("/")
def home():
    return {"message": "🏠 FastAPI backend running for House Price Predictor"}

@app.post("/train")
def train(algorithm: str = Query("linear", enum=["linear", "tree"])):
    from model.trainer import train_model
    metrics = train_model(algorithm)  # trainer.py should save metrics to JSON
    return {
        "status": "success",
        "message": f"{algorithm} model trained!",
        "metrics": metrics
    }

@app.get("/metrics")
def get_metrics(algorithm: str = Query("linear", enum=["linear", "tree"])):
    # Load metrics JSON
    metrics_path = f"model/saved_models/{algorithm}_metrics.json"
    if not os.path.exists(metrics_path):
        return JSONResponse(status_code=404, content={"error": "Metrics not found. Train model first"})
    
    with open(metrics_path, "r") as f:
        metrics = json.load(f)

    # Prepare sample predictions for chart
    model = load_model(algorithm)
    if model is None or df is None:
        sample_predictions = []
    else:
        X_sample = df[["area_sqft", "bedrooms", "stories", "year_built"]].head(10)
        y_actual = df["price"].head(10)
        y_pred = model.predict(X_sample)
        sample_predictions = [
            {"index": i+1, "actual": int(a), "predicted": int(p)}
            for i, (a, p) in enumerate(zip(y_actual, y_pred))
        ]

    return {
        "metrics": {
            "r2_score": metrics.get("r2_score", None),
            "mse": metrics.get("mse", None)
        },
        "sample_predictions": sample_predictions
    }

# Pydantic model for single prediction
class PredictRequest(BaseModel):
    algorithm: str
    area_sqft: float
    bedrooms: float
    stories: float
    year_built: float

@app.post("/predict")
def predict(req: PredictRequest):
    model = load_model(req.algorithm)
    if model is None:
        return JSONResponse(status_code=404, content={"error": "Model not found. Train first."})
    
    features = [[req.area_sqft, req.bedrooms, req.stories, req.year_built]]
    predicted_price = model.predict(features)[0]

    return {"predicted_price": float(predicted_price)}

# Optional: serve plots if already generated
@app.get("/plot/{plot_type}")
def get_plot(
    plot_type: Literal["actual_vs_pred", "residuals"],  # ✅ path param validation
    algorithm: str = Query("linear", enum=["linear", "tree"])  # ✅ query param
):
    path = f"model/saved_models/{algorithm}_{plot_type}.png"
    if os.path.exists(path):
        return FileResponse(path, media_type="image/png")
    return JSONResponse(status_code=404, content={"error": "Plot not found"})
