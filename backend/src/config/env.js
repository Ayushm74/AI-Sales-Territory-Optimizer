import dotenv from 'dotenv';

dotenv.config();

/**
 * Environment configuration
 * Validates and exports all environment variables
 */
export const config = {
  // Database
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'sales_territory_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
  },
  
  // Server
  server: {
    port: process.env.BACKEND_PORT || process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  
  // ML Service
  mlService: {
    url: process.env.ML_SERVICE_URL || 'http://localhost:5001',
  },
};

export default config;

