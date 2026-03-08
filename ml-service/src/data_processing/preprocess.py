import pandas as pd
import numpy as np


def clean_data(df):
    """
    Clean dataset before training
    """

    df = df.drop_duplicates()
    df = df.fillna(0)

    numeric_cols = ['revenue', 'deals', 'customers', 'market_size']

    for col in numeric_cols:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0)

    return df


def engineer_features(df):
    """
    Create ML features
    """

    features = pd.DataFrame()

    features["past_revenue"] = df["revenue"]
    features["deals"] = df["deals"]
    features["customers"] = df["customers"]
    features["market_size"] = df["market_size"]

    # efficiency metrics
    features["revenue_per_customer"] = np.where(
        df["customers"] > 0,
        df["revenue"] / df["customers"],
        0
    )

    features["revenue_per_deal"] = np.where(
        df["deals"] > 0,
        df["revenue"] / df["deals"],
        0
    )

    features["deal_conversion_rate"] = np.where(
        df["customers"] > 0,
        df["deals"] / df["customers"],
        0
    )

    features["market_capture_rate"] = np.where(
        df["market_size"] > 0,
        df["revenue"] / df["market_size"],
        0
    )

    features = features.fillna(0)

    return features


def prepare_training_data(sales_data, territory_data):

    sales_df = pd.DataFrame(sales_data)
    territory_df = pd.DataFrame(territory_data)

    sales_agg = sales_df.groupby("region").agg({
        "revenue": "sum",
        "deals": "sum",
        "customers": "sum"
    }).reset_index()

    df = territory_df.merge(sales_agg, on="region", how="left")
    df = df.fillna(0)

    df = clean_data(df)

    features = engineer_features(df)

    # target = future revenue proxy
    features["target_revenue"] = df["revenue"] * 1.15

    return features