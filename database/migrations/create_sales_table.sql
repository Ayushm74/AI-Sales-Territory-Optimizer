-- Create Sales Data Table Migration

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

CREATE INDEX IF NOT EXISTS idx_sales_data_region ON sales_data(region);
CREATE INDEX IF NOT EXISTS idx_sales_data_rep ON sales_data(sales_rep);

