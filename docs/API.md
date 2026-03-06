## API Reference

Base URL (dev): `http://localhost:5000/api`

### Upload

- **POST** `/upload-sales-data`
  - Form-data: `file` (CSV)
  - Required columns: `sales_rep, region, revenue, deals, customers`

- **POST** `/upload-territory-data`
  - Form-data: `file` (CSV)
  - Required columns: `region, market_size`

### Analysis

- **GET** `/territory-analysis`
  - Returns:
    - revenueByRegion
    - revenueByRep
    - marketAnalysis (opportunity gaps)
    - territoryScores (scoring formula)

### Prediction

- **POST** `/predict-revenue`
  - Triggers ML service prediction; persists results in `territory_data.predicted_revenue`

### Optimization

- **POST** `/optimize-territories`
  - Body:
    - `algorithm`: `greedy | hungarian | lp`
    - `maxTerritoriesPerRep`: integer (default 2)

- **GET** `/assignments`
  - Returns latest saved assignments from DB


