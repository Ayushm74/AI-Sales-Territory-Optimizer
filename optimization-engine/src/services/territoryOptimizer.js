/**
 * Territory Optimizer Service
 * Main service that coordinates optimization algorithms
 */

import greedyAssignment from '../algorithms/greedyAssignment.js';
import hungarianAssignment from '../algorithms/hungarianAlgorithm.js';
import linearProgrammingAssignment from '../algorithms/linearProgramming.js';

/**
 * Optimize territory assignments using specified algorithm
 * 
 * @param {Object} params - Optimization parameters
 * @param {Array} params.territories - Territories with predicted revenue
 * @param {Array} params.salesReps - Available sales reps
 * @param {string} params.algorithm - Algorithm to use (greedy, hungarian, lp)
 * @param {number} params.maxTerritoriesPerRep - Maximum territories per rep
 * @returns {Object} Optimization result with assignments and metrics
 */
export const optimize = (params) => {
  const {
    territories,
    salesReps,
    algorithm = 'greedy',
    maxTerritoriesPerRep = 2,
  } = params;

  if (!territories || territories.length === 0) {
    throw new Error('No territories provided');
  }

  if (!salesReps || salesReps.length === 0) {
    throw new Error('No sales reps provided');
  }

  let assignments;

  // Select algorithm
  switch (algorithm.toLowerCase()) {
    case 'greedy':
      assignments = greedyAssignment(territories, salesReps, maxTerritoriesPerRep);
      break;
    
    case 'hungarian':
      assignments = hungarianAssignment(territories, salesReps, maxTerritoriesPerRep);
      break;
    
    case 'lp':
    case 'linear':
    case 'linearprogramming':
      assignments = linearProgrammingAssignment(territories, salesReps, maxTerritoriesPerRep);
      break;
    
    default:
      throw new Error(`Unknown algorithm: ${algorithm}`);
  }

  // Calculate metrics
  const totalRevenue = assignments.reduce(
    (sum, a) => sum + (a.predicted_revenue || 0),
    0
  );

  const totalBeforeOptimization = territories.reduce(
    (sum, t) => sum + (t.predicted_revenue || 0),
    0
  );

  const repAssignments = {};
  assignments.forEach(a => {
    if (!repAssignments[a.sales_rep]) {
      repAssignments[a.sales_rep] = [];
    }
    repAssignments[a.sales_rep].push(a);
  });

  return {
    assignments,
    metrics: {
      totalAssignments: assignments.length,
      totalPredictedRevenue: totalRevenue,
      totalBeforeOptimization,
      improvement: totalRevenue - totalBeforeOptimization,
      improvementPercent: totalBeforeOptimization > 0 
        ? ((totalRevenue - totalBeforeOptimization) / totalBeforeOptimization) * 100 
        : 0,
      algorithm,
      repAssignments,
    },
  };
};

export default { optimize };

