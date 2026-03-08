"""
Feature Engineering Module
Creates features for territory revenue prediction
"""

import pandas as pd
import numpy as np


def create_territory_features(territory_data):
    """
    Create ML features for territory revenue prediction

    Args:
        territory_data: list of territory dictionaries

    Returns:
        features_df : dataframe of ML features
        regions : region names
    """

    df = pd.DataFrame(territory_data)

    # Required columns
    required_cols = [
        "region",
        "market_size",
        "past_revenue",
        "deals",
        "customers"
    ]

    # Ensure required columns exist
    for col in required_cols:
        if col not in df.columns:
            df[col] = 0

    # Convert numeric columns safely
    numeric_cols = [
        "market_size",
        "past_revenue",
        "deals",
        "customers"
    ]

    for col in numeric_cols:
        df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0)

    # Create feature dataframe
    features = pd.DataFrame()

    # Basic Features
    features["past_revenue"] = df["past_revenue"]
    features["deals"] = df["deals"]
    features["customers"] = df["customers"]
    features["market_size"] = df["market_size"]

    # Revenue efficiency
    features["revenue_per_customer"] = np.where(
        df["customers"] > 0,
        df["past_revenue"] / df["customers"],
        0
    )

    features["revenue_per_deal"] = np.where(
        df["deals"] > 0,
        df["past_revenue"] / df["deals"],
        0
    )

    # Sales efficiency
    features["deal_conversion_rate"] = np.where(
        df["customers"] > 0,
        df["deals"] / df["customers"],
        0
    )

    # Market capture
    features["market_capture_rate"] = np.where(
        df["market_size"] > 0,
        df["past_revenue"] / df["market_size"],
        0
    )

    # Market opportunity remaining
    features["remaining_market"] = np.maximum(
        df["market_size"] - df["past_revenue"],
        0
    )

    # Fill missing values
    features = features.fillna(0)

    return features, df["region"].values