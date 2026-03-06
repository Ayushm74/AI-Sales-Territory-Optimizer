"""
Data Preprocessing Module
Handles data cleaning and feature engineering for ML model
"""

import pandas as pd
import numpy as np


def clean_data(df):
    """
    Clean and prepare data for training
    
    Args:
        df: DataFrame with sales data
        
    Returns:
        Cleaned DataFrame
    """
    # Remove duplicates
    df = df.drop_duplicates()
    
    # Handle missing values
    df = df.fillna(0)
    
    # Ensure numeric columns are numeric
    numeric_cols = ['revenue', 'deals', 'customers', 'market_size']
    for col in numeric_cols:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)
    
    return df


def engineer_features(df):
    """
    Create features for ML model
    
    Args:
        df: DataFrame with sales and territory data
        
    Returns:
        DataFrame with engineered features
    """
    # Create feature DataFrame
    features = pd.DataFrame()
    
    # Basic features
    features['past_revenue'] = df.get('revenue', 0)
    features['deals'] = df.get('deals', 0)
    features['customers'] = df.get('customers', 0)
    features['market_size'] = df.get('market_size', 0)
    
    # Derived features
    if 'revenue' in df.columns and 'customers' in df.columns:
        features['revenue_per_customer'] = np.where(
            features['customers'] > 0,
            features['past_revenue'] / features['customers'],
            0
        )
    
    if 'revenue' in df.columns and 'deals' in df.columns:
        features['revenue_per_deal'] = np.where(
            features['deals'] > 0,
            features['past_revenue'] / features['deals'],
            0
        )
    
    if 'market_size' in df.columns:
        features['market_potential_ratio'] = np.where(
            features['market_size'] > 0,
            features['past_revenue'] / features['market_size'],
            0
        )
    
    # Fill NaN values
    features = features.fillna(0)
    
    return features


def prepare_training_data(sales_data, territory_data):
    """
    Prepare training data by merging sales and territory data
    
    Args:
        sales_data: List of sales records
        territory_data: List of territory records
        
    Returns:
        DataFrame ready for training
    """
    # Convert to DataFrames
    sales_df = pd.DataFrame(sales_data)
    territory_df = pd.DataFrame(territory_data)
    
    # Aggregate sales data by region
    if not sales_df.empty:
        sales_agg = sales_df.groupby('region').agg({
            'revenue': 'sum',
            'deals': 'sum',
            'customers': 'sum',
        }).reset_index()
    else:
        sales_agg = pd.DataFrame(columns=['region', 'revenue', 'deals', 'customers'])
    
    # Merge with territory data
    if not territory_df.empty:
        df = territory_df.merge(sales_agg, on='region', how='left')
        df = df.fillna(0)
    else:
        df = sales_agg
    
    # Clean and engineer features
    df = clean_data(df)
    features = engineer_features(df)
    
    # Add target (revenue) - for training, we'll use past revenue as proxy
    # In production, this would be actual future revenue
    features['target_revenue'] = df.get('revenue', 0)
    
    return features

