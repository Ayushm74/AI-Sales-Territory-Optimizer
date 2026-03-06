"""
Model Training Module
Trains RandomForestRegressor for revenue prediction
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import os
from pathlib import Path

# Import preprocessing functions
import sys
sys.path.append(str(Path(__file__).parent.parent))
from data_processing.preprocess import prepare_training_data


def train_revenue_model(sales_data, territory_data, model_path='models/revenue_prediction_model.pkl'):
    """
    Train RandomForestRegressor model for revenue prediction
    
    Args:
        sales_data: List of sales records
        territory_data: List of territory records
        model_path: Path to save the trained model
        
    Returns:
        Dictionary with training results and metrics
    """
    # Prepare training data
    features_df = prepare_training_data(sales_data, territory_data)
    
    if len(features_df) < 3:
        raise ValueError("Insufficient data for training. Need at least 3 records.")
    
    # Separate features and target
    feature_cols = [col for col in features_df.columns if col != 'target_revenue']
    X = features_df[feature_cols]
    y = features_df['target_revenue']
    
    # Split data (if enough samples)
    if len(X) >= 4:
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
    else:
        # Use all data for training if too few samples
        X_train, X_test, y_train, y_test = X, X, y, y
    
    # Train model
    model = RandomForestRegressor(
        n_estimators=100,
        max_depth=10,
        min_samples_split=2,
        min_samples_leaf=1,
        random_state=42,
        n_jobs=-1
    )
    
    model.fit(X_train, y_train)
    
    # Make predictions
    y_train_pred = model.predict(X_train)
    y_test_pred = model.predict(X_test)
    
    # Calculate metrics
    train_mae = mean_absolute_error(y_train, y_train_pred)
    test_mae = mean_absolute_error(y_test, y_test_pred)
    train_rmse = np.sqrt(mean_squared_error(y_train, y_train_pred))
    test_rmse = np.sqrt(mean_squared_error(y_test, y_test_pred))
    train_r2 = r2_score(y_train, y_train_pred)
    test_r2 = r2_score(y_test, y_test_pred)
    
    # Save model
    os.makedirs(os.path.dirname(model_path), exist_ok=True)
    joblib.dump(model, model_path)
    
    # Save feature names for later use
    feature_names_path = model_path.replace('.pkl', '_features.pkl')
    joblib.dump(feature_cols, feature_names_path)
    
    return {
        'success': True,
        'model_path': model_path,
        'metrics': {
            'train_mae': float(train_mae),
            'test_mae': float(test_mae),
            'train_rmse': float(train_rmse),
            'test_rmse': float(test_rmse),
            'train_r2': float(train_r2),
            'test_r2': float(test_r2),
        },
        'training_samples': len(X_train),
        'test_samples': len(X_test),
    }


if __name__ == '__main__':
    # Example usage
    sales_data = [
        {'sales_rep': 'John', 'region': 'California', 'revenue': 120000, 'deals': 8, 'customers': 15},
        {'sales_rep': 'Alice', 'region': 'Texas', 'revenue': 90000, 'deals': 5, 'customers': 10},
    ]
    
    territory_data = [
        {'region': 'California', 'market_size': 500000},
        {'region': 'Texas', 'market_size': 350000},
    ]
    
    result = train_revenue_model(sales_data, territory_data)
    print(result)

