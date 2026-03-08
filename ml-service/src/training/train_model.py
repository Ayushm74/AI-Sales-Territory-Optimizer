import pandas as pd
import numpy as np
import joblib
import os

from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

from data_processing.preprocess import prepare_training_data


def train_revenue_model(sales_data, territory_data, model_path="models/revenue_prediction_model.pkl"):

    features_df = prepare_training_data(sales_data, territory_data)

    X = features_df.drop("target_revenue", axis=1)
    y = features_df["target_revenue"]

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42
    )

    model = RandomForestRegressor(
        n_estimators=300,
        max_depth=12,
        min_samples_leaf=2,
        random_state=42,
        n_jobs=-1
    )

    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)

    mae = mean_absolute_error(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    r2 = r2_score(y_test, y_pred)

    os.makedirs("models", exist_ok=True)

    joblib.dump(model, model_path)
    joblib.dump(list(X.columns), model_path.replace(".pkl", "_features.pkl"))

    return {
        "success": True,
        "MAE": float(mae),
        "RMSE": float(rmse),
        "R2": float(r2)
    }