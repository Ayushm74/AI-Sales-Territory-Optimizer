-- Seed Data for Development and Testing

-- Clear existing data
TRUNCATE TABLE assignments, sales_data, territory_data RESTART IDENTITY;

-- Insert sample sales data
INSERT INTO sales_data (sales_rep, region, revenue, deals, customers) VALUES
('John', 'California', 120000, 8, 15),
('Alice', 'Texas', 90000, 5, 10),
('Mark', 'New York', 50000, 4, 6),
('David', 'Florida', 70000, 6, 9),
('Sarah', 'California', 110000, 7, 14),
('Mike', 'Texas', 85000, 6, 11),
('Emma', 'New York', 60000, 5, 7),
('Chris', 'Florida', 75000, 7, 10);

-- Insert sample territory data
INSERT INTO territory_data (region, market_size) VALUES
('California', 500000),
('Texas', 350000),
('New York', 450000),
('Florida', 300000),
('Illinois', 280000),
('Pennsylvania', 250000),
('Ohio', 220000),
('Georgia', 200000);

