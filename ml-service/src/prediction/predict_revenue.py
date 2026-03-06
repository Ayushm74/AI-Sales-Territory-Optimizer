"""
Revenue Prediction Module
Uses trained model to predict revenue for territories
"""

import pandas as pd
import numpy as np
import joblib
import os
from pathlib import Path

# Import feature engineering
import sys
sys.path.append(str(Path(__file__).parent.parent))
from data_processing.feature_engineering import create_territory_features


def load_model(model_path='models/revenue_prediction_model.pkl'):
    """
    Load trained model and feature names
    
    Args:
        model_path: Path to the model file
        
    Returns:
        Tuple of (model, feature_names)
    """
    if not os.path.exists(model_path):
        return None, None
    
    model = joblib.load(model_path)
    feature_names_path = model_path.replace('.pkl', '_features.pkl')
    
    if os.path.exists(feature_names_path):
        feature_names = joblib.load(feature_names_path)
    else:
        # Default feature names if not saved
        feature_names = ['past_revenue', 'deals', 'customers', 'market_size',
                        'revenue_per_customer', 'revenue_per_deal', 'market_potential_ratio',
                        'deal_conversion_rate']
    
    return model, feature_names


def predict_revenue(territories, model_path='models/revenue_prediction_model.pkl'):
    """
    Predict revenue for territories
    
    Args:
        territories: List of territory dictionaries with features
        model_path: Path to the trained model
        
    Returns:
        List of predictions with region and predicted_revenue
    """
    # Load model
    model, feature_names = load_model(model_path)
    
    # If no model exists, use fallback prediction
    if model is None:
        return fallback_prediction(territories)
    
    # Create features
    features_df, regions = create_territory_features(territories)
    
    # Ensure all required features are present
    for feature in feature_names:
        if feature not in features_df.columns:
            features_df[feature] = 0
    
    # Select features in correct order
    X = features_df[feature_names]
    
    # Make predictions
    predictions = model.predict(X)
    
    # Ensure predictions are non-negative
    predictions = np.maximum(predictions, 0)
    
    # Format results
    results = []
    for i, region in enumerate(regions):
        results.append({
            'region': region,
            'predicted_revenue': float(round(predictions[i], 2))
        })
    
    return results


def fallback_prediction(territories):
    """
    Fallback prediction using simple heuristic
    Used when model is not available
    
    Args:
        territories: List of territory dictionaries
        
    Returns:
        List of predictions
    """
    results = []
    for territory in territories:
        market_size = float(territory.get('market_size', 0))
        past_revenue = float(territory.get('past_revenue', 0))
        
        # Simple heuristic: predicted_revenue = market_size * 0.3 + past_revenue * 0.2
        predicted_revenue = market_size * 0.3 + past_revenue * 0.2
        
        results.append({
            'region': territory['region'],
            'predicted_revenue': round(predicted_revenue, 2)
        })
    
    return results

