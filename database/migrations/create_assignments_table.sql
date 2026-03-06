-- Create Assignments Table Migration

CREATE TABLE IF NOT EXISTS assignments (
    id SERIAL PRIMARY KEY,
    sales_rep VARCHAR(100) NOT NULL,
    territory VARCHAR(100) NOT NULL,
    predicted_revenue DECIMAL(12, 2) NOT NULL,
    algorithm_used VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(sales_rep, territory)
);

CREATE INDEX IF NOT EXISTS idx_assignments_rep ON assignments(sales_rep);
CREATE INDEX IF NOT EXISTS idx_assignments_territory ON assignments(territory);

