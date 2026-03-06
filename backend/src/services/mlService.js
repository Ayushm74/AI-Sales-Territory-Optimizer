import axios from 'axios';
import { config } from '../config/env.js';
import logger from '../utils/logger.js';

/**
 * ML Service Client
 * Communicates with Python ML service for revenue predictions
 */

const ML_SERVICE_URL = config.mlService.url;

/**
 * Predict revenue for territories
 * @param {Array} territories - Array of territory data with features
 * @returns {Promise<Array>} Predictions with predicted_revenue
 */
export const predictRevenue = async (territories) => {
  try {
    logger.info('Calling ML service for revenue prediction', { count: territories.length });
    
    const response = await axios.post(`${ML_SERVICE_URL}/predict`, {
      territories: territories,
    });

    if (response.data.success) {
      return response.data.predictions;
    } else {
      throw new Error(response.data.message || 'ML prediction failed');
    }
  } catch (error) {
    logger.error('ML service error:', error.message);
    
    // Fallback: Use simple heuristic if ML service is unavailable
    if (error.code === 'ECONNREFUSED' || error.response?.status >= 500) {
      logger.warn('ML service unavailable, using fallback prediction');
      return fallbackPrediction(territories);
    }
    
    throw error;
  }
};

/**
 * Fallback prediction using simple heuristic
 * @param {Array} territories - Territory data
 * @returns {Array} Predictions
 */
const fallbackPrediction = (territories) => {
  return territories.map(territory => {
    // Simple heuristic: predicted_revenue = market_size * 0.3
    // This is a placeholder until ML model is trained
    const predictedRevenue = (territory.market_size || 0) * 0.3;
    
    return {
      region: territory.region,
      predicted_revenue: Math.round(predictedRevenue * 100) / 100,
    };
  });
};

/**
 * Train ML model with historical data
 * @param {Array} trainingData - Historical sales data
 * @returns {Promise<Object>} Training result
 */
export const trainModel = async (trainingData) => {
  try {
    logger.info('Training ML model', { records: trainingData.length });
    
    const response = await axios.post(`${ML_SERVICE_URL}/train`, {
      data: trainingData,
    });

    return response.data;
  } catch (error) {
    logger.error('ML training error:', error.message);
    throw error;
  }
};

export default { predictRevenue, trainModel };

