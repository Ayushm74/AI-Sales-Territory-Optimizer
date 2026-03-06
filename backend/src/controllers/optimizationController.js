import { Territory } from '../models/Territory.js';
import { SalesData } from '../models/SalesData.js';
import { Assignment } from '../models/Assignment.js';
import { optimizeTerritories } from '../services/optimizationService.js';
import { successResponse, errorResponse } from '../utils/responseFormatter.js';
import logger from '../utils/logger.js';

/**
 * Optimization Controller
 * Handles territory optimization operations
 */

/**
 * Optimize territory assignments
 * POST /api/optimize-territories
 */
export const optimizeTerritoryAssignments = async (req, res, next) => {
  try {
    const { algorithm = 'greedy', maxTerritoriesPerRep = 2 } = req.body;

    logger.info('Starting territory optimization', { algorithm, maxTerritoriesPerRep });

    // Get territories with predicted revenue
    const territories = await Territory.findAll();
    
    if (territories.length === 0) {
      return errorResponse(res, 'No territories found. Please upload territory data and run predictions first.', 400);
    }

    // Filter territories with predicted revenue
    const territoriesWithPredictions = territories.filter(t => t.predicted_revenue != null);
    
    if (territoriesWithPredictions.length === 0) {
      return errorResponse(res, 'No predicted revenue found. Please run revenue prediction first.', 400);
    }

    // Get unique sales reps
    const salesData = await SalesData.findAll();
    const salesReps = [...new Set(salesData.map(s => s.sales_rep))];
    
    if (salesReps.length === 0) {
      return errorResponse(res, 'No sales reps found. Please upload sales data first.', 400);
    }

    // Prepare territories for optimization
    const territoriesForOptimization = territoriesWithPredictions.map(t => ({
      region: t.region,
      predicted_revenue: parseFloat(t.predicted_revenue || 0),
      market_size: parseFloat(t.market_size || 0),
    }));

    // Run optimization
    const assignments = await optimizeTerritories({
      territories: territoriesForOptimization,
      salesReps,
      algorithm,
      maxTerritoriesPerRep: parseInt(maxTerritoriesPerRep),
    });

    // Save assignments to database
    await Assignment.saveAssignments(assignments, algorithm);

    // Calculate metrics
    const totalPredictedRevenue = assignments.reduce(
      (sum, a) => sum + (a.predicted_revenue || 0),
      0
    );

    // Calculate before optimization (sum of all predicted revenue)
    const totalBeforeOptimization = territoriesWithPredictions.reduce(
      (sum, t) => sum + parseFloat(t.predicted_revenue || 0),
      0
    );

    logger.info('Territory optimization completed', { 
      assignments: assignments.length,
      totalRevenue: totalPredictedRevenue 
    });

    return successResponse(
      res,
      {
        assignments,
        metrics: {
          totalAssignments: assignments.length,
          totalPredictedRevenue,
          totalBeforeOptimization,
          improvement: totalPredictedRevenue - totalBeforeOptimization,
          algorithm,
        },
      },
      'Territory optimization completed successfully'
    );
  } catch (error) {
    logger.error('Territory optimization error:', error);
    next(error);
  }
};

/**
 * Get optimized assignments
 * GET /api/assignments
 */
export const getAssignments = async (req, res, next) => {
  try {
    const assignments = await Assignment.findAll();
    const stats = await Assignment.getStatistics();

    return successResponse(
      res,
      {
        assignments,
        statistics: stats,
      },
      'Assignments retrieved successfully'
    );
  } catch (error) {
    logger.error('Get assignments error:', error);
    next(error);
  }
};

export default { optimizeTerritoryAssignments, getAssignments };

