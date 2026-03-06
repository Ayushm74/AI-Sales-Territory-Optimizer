-- AI Sales Territory Optimizer Database Schema

-- Create database (run this separately if needed)
-- CREATE DATABASE sales_territory_db;

-- Sales Data Table
CREATE TABLE IF NOT EXISTS sales_data (
    id SERIAL PRIMARY KEY,
    sales_rep VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL,
    revenue DECIMAL(12, 2) NOT NULL,
    deals INTEGER NOT NULL,
    customers INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Territory Data Table
CREATE TABLE IF NOT EXISTS territory_data (
    id SERIAL PRIMARY KEY,
    region VARCHAR(100) UNIQUE NOT NULL,
    market_size DECIMAL(12, 2) NOT NULL,
    predicted_revenue DECIMAL(12, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Assignments Table
CREATE TABLE IF NOT EXISTS assignments (
    id SERIAL PRIMARY KEY,
    sales_rep VARCHAR(100) NOT NULL,
    territory VARCHAR(100) NOT NULL,
    predicted_revenue DECIMAL(12, 2) NOT NULL,
    algorithm_used VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(sales_rep, territory)
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_sales_data_region ON sales_data(region);
CREATE INDEX IF NOT EXISTS idx_sales_data_rep ON sales_data(sales_rep);
CREATE INDEX IF NOT EXISTS idx_territory_data_region ON territory_data(region);
CREATE INDEX IF NOT EXISTS idx_assignments_rep ON assignments(sales_rep);
CREATE INDEX IF NOT EXISTS idx_assignments_territory ON assignments(territory);

