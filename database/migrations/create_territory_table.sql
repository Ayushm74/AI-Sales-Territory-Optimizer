-- Create Territory Data Table Migration

CREATE TABLE IF NOT EXISTS territory_data (
    id SERIAL PRIMARY KEY,
    region VARCHAR(100) UNIQUE NOT NULL,
    market_size DECIMAL(12, 2) NOT NULL,
    predicted_revenue DECIMAL(12, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_territory_data_region ON territory_data(region);

