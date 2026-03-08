import pandas as pd
import numpy as np
import joblib
import os

from data_processing.feature_engineering import create_territory_features


def load_model(model_path):

    if not os.path.exists(model_path):
        raise Exception("Model not trained. Run /train first.")

    model = joblib.load(model_path)

    feature_names = joblib.load(
        model_path.replace(".pkl", "_features.pkl")
    )

    return model, feature_names


def predict_revenue(territories, model_path):

    model, feature_names = load_model(model_path)

    features_df, regions = create_territory_features(territories)

    for f in feature_names:
        if f not in features_df.columns:
            features_df[f] = 0

    X = features_df[feature_names]

    predictions = model.predict(X)

    predictions = np.maximum(predictions, 0)

    results = []

    for i, region in enumerate(regions):

        results.append({
            "region": region,
            "predicted_revenue": float(round(predictions[i], 2))
        })

    return results