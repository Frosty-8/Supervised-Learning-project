import os, json
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import r2_score, mean_squared_error
import joblib
import logging
from rich.logging import RichHandler
from rich.console import Console
from rich.table import Table
from rich.panel import Panel
from rich import box

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[RichHandler(rich_tracebacks=True)]
)


def train_model(algorithm="linear", visualize=True):
    # Load dataset
    try:
        df = pd.read_csv("../data/house_data.csv")
    except FileNotFoundError:
        logging.error("Dataset not found. Please ensure Dataset exists.")
        return

    # Define features and target
    X = df[["area_sqft", "bedrooms", "stories", "year_built"]]
    y = df["price"]

    # Split dataset
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    # Select model
    if algorithm == "tree":
        model = DecisionTreeRegressor(random_state=42)
    else:
        model = LinearRegression()

    # Train model
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    # Evaluate model
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    # Save model
    os.makedirs("saved_models", exist_ok=True)
    joblib.dump(model, f"saved_models/{algorithm}_model.pkl")

        # Save metrics as JSON
    metrics = {
        "algorithm": algorithm,
        "mse": round(mse, 2),
        "r2_score": round(r2, 4),
        "samples": [
            {"actual": float(a), "predicted": float(p)} 
            for a, p in zip(y_test[:5], y_pred[:5])
        ]
    }
    with open(f"saved_models/{algorithm}_metrics.json", "w") as f:
        json.dump(metrics, f, indent=4)

    # --- Rich Console Output ---
    console = Console()

    console.print(
        Panel.fit(
            f"[bold green]Model Trained Successfully![/bold green]\nAlgorithm: [cyan]{algorithm.upper()}[/cyan]",
            border_style="green",
        )
    )

    metrics_table = Table(title="📈 Evaluation Metrics", box=box.SIMPLE_HEAD)
    metrics_table.add_column("Metric", style="bold magenta")
    metrics_table.add_column("Value", style="bold yellow")
    metrics_table.add_row("Mean Squared Error", f"{mse:.2f}")
    metrics_table.add_row("R² Score", f"{r2:.4f}")
    console.print(metrics_table)

    pred_table = Table(title="🔍 Sample Predictions", box=box.SIMPLE_HEAD)
    pred_table.add_column("Actual Price", style="green")
    pred_table.add_column("Predicted Price", style="blue")

    for actual, pred in zip(y_test[:5], y_pred[:5]):
        pred_table.add_row(f"${actual:,.2f}", f"${pred:,.2f}")

    console.print(pred_table)

    # Logging summary
    logging.info(f"Algorithm used: {algorithm.upper()}")
    logging.info(f"Mean Squared Error: {mse:.2f}")
    logging.info(f"R² Score: {r2:.4f}")

    # --- Visualization Section ---
    if visualize:
        plt.style.use("seaborn-v0_8")

        # 1️⃣ Actual vs Predicted
        plt.figure(figsize=(8, 6))
        sns.scatterplot(x=y_test, y=y_pred, alpha=0.7, edgecolor=None)
        plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--', lw=2)
        plt.xlabel("Actual Prices")
        plt.ylabel("Predicted Prices")
        plt.title(f"{algorithm.upper()} - Actual vs Predicted Prices")
        plt.tight_layout()
        logging.info(f"{algorithm}_actual_vs_pred.png has been saved")
        plt.savefig(f"saved_models/{algorithm}_actual_vs_pred.png")
        plt.close()

        # 2️⃣ Residual Distribution
        residuals = y_test - y_pred
        plt.figure(figsize=(8, 5))
        sns.histplot(residuals, bins=30, kde=True, color='purple')
        plt.title(f"{algorithm.upper()} - Residuals Distribution")
        plt.xlabel("Residual (Actual - Predicted)")
        plt.ylabel("Count")
        plt.tight_layout()
        logging.info(f"{algorithm}_residual.png has been saved")
        plt.savefig(f"saved_models/{algorithm}_residuals.png")
        plt.close()

    return metrics

if __name__ == "__main__":
    train_model("linear")
    train_model("tree")
