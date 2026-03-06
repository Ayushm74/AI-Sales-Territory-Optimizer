"""
Feature Engineering Module
Creates features for territory revenue prediction
"""

import pandas as pd
import numpy as np


def create_territory_features(territory_data):
    """
    Create features for territory revenue prediction
    
    Args:
        territory_data: List of territory dictionaries with features
        
    Returns:
        DataFrame with features ready for prediction
    """
    df = pd.DataFrame(territory_data)
    
    # Ensure required columns exist
    required_cols = ['region', 'market_size', 'past_revenue', 'deals', 'customers']
    for col in required_cols:
        if col not in df.columns:
            df[col] = 0
    
    # Convert to numeric
    numeric_cols = ['market_size', 'past_revenue', 'deals', 'customers']
    for col in numeric_cols:
        df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)
    
    # Create derived features
    features = pd.DataFrame()
    
    # Basic features
    features['past_revenue'] = df['past_revenue']
    features['deals'] = df['deals']
    features['customers'] = df['customers']
    features['market_size'] = df['market_size']
    
    # Derived features
    features['revenue_per_customer'] = np.where(
        df['customers'] > 0,
        df['past_revenue'] / df['customers'],
        0
    )
    
    features['revenue_per_deal'] = np.where(
        df['deals'] > 0,
        df['past_revenue'] / df['deals'],
        0
    )
    
    features['market_potential_ratio'] = np.where(
        df['market_size'] > 0,
        df['past_revenue'] / df['market_size'],
        0
    )
    
    # Deal conversion rate (deals per customer)
    features['deal_conversion_rate'] = np.where(
        df['customers'] > 0,
        df['deals'] / df['customers'],
        0
    )
    
    # Fill NaN values
    features = features.fillna(0)
    
    return features, df['region'].values

