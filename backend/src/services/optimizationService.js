import axios from 'axios';
import { config } from '../config/env.js';
import logger from '../utils/logger.js';

/**
 * Optimization Service
 * Communicates with optimization engine for territory assignments
 */

const OPTIMIZATION_ENGINE_URL = process.env.OPTIMIZATION_ENGINE_URL || 'http://localhost:5002';

/**
 * Optimize territory assignments
 * @param {Object} params - Optimization parameters
 * @param {Array} params.territories - Territories with predicted revenue
 * @param {Array} params.salesReps - Available sales reps
 * @param {string} params.algorithm - Algorithm to use (greedy, hungarian, lp)
 * @param {number} params.maxTerritoriesPerRep - Maximum territories per rep
 * @returns {Promise<Array>} Optimized assignments
 */
export const optimizeTerritories = async (params) => {
  try {
    logger.info('Calling optimization engine', { 
      algorithm: params.algorithm,
      territories: params.territories.length,
      reps: params.salesReps.length 
    });

    // For now, use local optimization (optimization engine will be separate service)
    // In production, this would call the optimization engine API
    return localOptimization(params);
  } catch (error) {
    logger.error('Optimization error:', error.message);
    throw error;
  }
};

/**
 * Local optimization (fallback or primary implementation)
 * @param {Object} params - Optimization parameters
 * @returns {Array} Optimized assignments
 */
const localOptimization = (params) => {
  const { territories, salesReps, algorithm = 'greedy', maxTerritoriesPerRep = 2 } = params;

  switch (algorithm) {
    case 'greedy':
      return greedyAssignment(territories, salesReps, maxTerritoriesPerRep);
    case 'hungarian':
      return hungarianAssignment(territories, salesReps, maxTerritoriesPerRep);
    case 'lp':
      return linearProgrammingAssignment(territories, salesReps, maxTerritoriesPerRep);
    default:
      return greedyAssignment(territories, salesReps, maxTerritoriesPerRep);
  }
};

/**
 * Greedy assignment algorithm
 * Assigns highest revenue territories first
 */
const greedyAssignment = (territories, salesReps, maxTerritoriesPerRep) => {
  // Sort territories by predicted revenue (descending)
  const sortedTerritories = [...territories].sort((a, b) => 
    (b.predicted_revenue || 0) - (a.predicted_revenue || 0)
  );

  const assignments = [];
  const repTerritoryCount = {};
  
  // Initialize rep counts
  salesReps.forEach(rep => {
    repTerritoryCount[rep] = 0;
  });

  // Assign territories greedily
  for (const territory of sortedTerritories) {
    // Find rep with fewest territories
    let bestRep = null;
    let minCount = Infinity;

    for (const rep of salesReps) {
      if (repTerritoryCount[rep] < maxTerritoriesPerRep && 
          repTerritoryCount[rep] < minCount) {
        minCount = repTerritoryCount[rep];
        bestRep = rep;
      }
    }

    if (bestRep) {
      assignments.push({
        sales_rep: bestRep,
        territory: territory.region,
        predicted_revenue: territory.predicted_revenue || 0,
      });
      repTerritoryCount[bestRep]++;
    }
  }

  return assignments;
};

/**
 * Hungarian algorithm assignment (simplified)
 * For perfect matching scenarios
 */
const hungarianAssignment = (territories, salesReps, maxTerritoriesPerRep) => {
  // Simplified Hungarian: Use greedy for now
  // Full Hungarian algorithm would require more complex implementation
  return greedyAssignment(territories, salesReps, maxTerritoriesPerRep);
};

/**
 * Linear Programming assignment (simplified)
 * Uses greedy as approximation
 */
const linearProgrammingAssignment = (territories, salesReps, maxTerritoriesPerRep) => {
  // Simplified LP: Use greedy for now
  // Full LP would require a solver library
  return greedyAssignment(territories, salesReps, maxTerritoriesPerRep);
};

export default { optimizeTerritories };

