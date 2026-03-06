import { Territory } from '../models/Territory.js';
import { SalesData } from '../models/SalesData.js';
import { predictRevenue } from '../services/mlService.js';
import { successResponse, errorResponse } from '../utils/responseFormatter.js';
import logger from '../utils/logger.js';
import { query } from '../config/db.js';

/**
 * Prediction Controller
 * Handles revenue prediction operations
 */

/**
 * Predict revenue for territories
 * POST /api/predict-revenue
 */
export const predictTerritoryRevenue = async (req, res, next) => {
  try {
    logger.info('Starting revenue prediction');

    // Get all territories
    const territories = await Territory.findAll();
    
    if (territories.length === 0) {
      return errorResponse(res, 'No territories found. Please upload territory data first.', 400);
    }

    // Get historical sales data for feature engineering
    const salesData = await SalesData.findAll();
    
    // Prepare territory data with features for ML model
    const territoriesWithFeatures = territories.map(territory => {
      // Get sales data for this territory
      const territorySales = salesData.filter(s => s.region === territory.region);
      
      const totalRevenue = territorySales.reduce((sum, s) => sum + parseFloat(s.revenue || 0), 0);
      const totalDeals = territorySales.reduce((sum, s) => sum + parseInt(s.deals || 0), 0);
      const totalCustomers = territorySales.reduce((sum, s) => sum + parseInt(s.customers || 0), 0);
      const repCount = new Set(territorySales.map(s => s.sales_rep)).size;

      return {
        region: territory.region,
        market_size: parseFloat(territory.market_size || 0),
        past_revenue: totalRevenue,
        deals: totalDeals,
        customers: totalCustomers,
        rep_count: repCount,
      };
    });

    // Call ML service for predictions
    const predictions = await predictRevenue(territoriesWithFeatures);

    // Update territory data with predictions
    await Territory.bulkUpdatePredictedRevenue(predictions);

    logger.info('Revenue prediction completed', { count: predictions.length });

    return successResponse(
      res,
      {
        predictions,
        totalPredictedRevenue: predictions.reduce((sum, p) => sum + (p.predicted_revenue || 0), 0),
      },
      'Revenue prediction completed successfully'
    );
  } catch (error) {
    logger.error('Revenue prediction error:', error);
    next(error);
  }
};

export default { predictTerritoryRevenue };

