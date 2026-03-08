import pandas as pd
import requests

# Load CSV files
sales_df = pd.read_csv("data/india_sales_data.csv")
territory_df = pd.read_csv("data/india_region_market.csv")

# Convert to JSON format required by API
sales_data = sales_df.to_dict(orient="records")
territory_data = territory_df[["region", "market_size"]].to_dict(orient="records")

payload = {
    "data": sales_data,
    "territory_data": territory_data
}

# Send training request
response = requests.post(
    "http://localhost:5001/train",
    json=payload
)

print("Status:", response.status_code)
print(response.json())