"""
Helper Utilities
Common utility functions for ML service
"""

import os
from pathlib import Path


def ensure_model_directory(model_path='models/revenue_prediction_model.pkl'):
    """
    Ensure model directory exists
    
    Args:
        model_path: Path to model file
    """
    model_dir = os.path.dirname(model_path)
    if model_dir:
        os.makedirs(model_dir, exist_ok=True)


def get_model_path():
    """
    Get the path to the model file
    
    Returns:
        Absolute path to model file
    """
    base_dir = Path(__file__).parent.parent.parent
    model_path = base_dir / 'models' / 'revenue_prediction_model.pkl'
    return str(model_path)

