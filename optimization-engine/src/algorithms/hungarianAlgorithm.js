/**
 * Hungarian Algorithm (Kuhn-Munkres Algorithm)
 * Solves the assignment problem for optimal matching
 * 
 * Note: This is a simplified implementation. For production, consider using
 * a more robust library like 'hungarian-algorithm' npm package
 */

/**
 * Hungarian algorithm for optimal assignment
 * 
 * @param {Array} territories - Array of {region, predicted_revenue, market_size}
 * @param {Array} salesReps - Array of sales rep names
 * @param {number} maxTerritoriesPerRep - Maximum territories per rep
 * @returns {Array} Array of assignments {sales_rep, territory, predicted_revenue}
 */
export const hungarianAssignment = (territories, salesReps, maxTerritoriesPerRep = 2) => {
  // For simplicity, we'll use a greedy approach with Hungarian-inspired matching
  // A full Hungarian algorithm implementation would be more complex
  
  // Create cost matrix: negative revenue (we want to maximize, so minimize negative)
  const n = territories.length;
  const m = salesReps.length * maxTerritoriesPerRep;
  
  // If we have more territories than available slots, use greedy
  if (n > m) {
    return greedyFallback(territories, salesReps, maxTerritoriesPerRep);
  }
  
  // Create expanded rep list (each rep appears maxTerritoriesPerRep times)
  const expandedReps = [];
  salesReps.forEach(rep => {
    for (let i = 0; i < maxTerritoriesPerRep; i++) {
      expandedReps.push(rep);
    }
  });
  
  // Create cost matrix (negative revenue for minimization)
  const costMatrix = territories.map(territory => {
    return expandedReps.map(() => -(territory.predicted_revenue || 0));
  });
  
  // Simplified Hungarian: Use greedy matching with cost consideration
  return greedyWithCostMatrix(territories, expandedReps, costMatrix);
};

/**
 * Greedy fallback when territories exceed capacity
 */
const greedyFallback = (territories, salesReps, maxTerritoriesPerRep) => {
  const sortedTerritories = [...territories].sort((a, b) => 
    (b.predicted_revenue || 0) - (a.predicted_revenue || 0)
  );

  const assignments = [];
  const repCount = {};
  salesReps.forEach(rep => repCount[rep] = 0);

  for (const territory of sortedTerritories) {
    let bestRep = null;
    let minCount = Infinity;

    for (const rep of salesReps) {
      if (repCount[rep] < maxTerritoriesPerRep && repCount[rep] < minCount) {
        minCount = repCount[rep];
        bestRep = rep;
      }
    }

    if (bestRep) {
      assignments.push({
        sales_rep: bestRep,
        territory: territory.region,
        predicted_revenue: territory.predicted_revenue || 0,
      });
      repCount[bestRep]++;
    }
  }

  return assignments;
};

/**
 * Greedy assignment with cost matrix consideration
 */
const greedyWithCostMatrix = (territories, expandedReps, costMatrix) => {
  const assignments = [];
  const usedReps = new Set();
  const usedTerritories = new Set();
  
  // Sort by cost (ascending, since we negated revenue)
  const pairs = [];
  for (let i = 0; i < territories.length; i++) {
    for (let j = 0; j < expandedReps.length; j++) {
      pairs.push({
        territoryIdx: i,
        repIdx: j,
        cost: costMatrix[i][j],
        revenue: -costMatrix[i][j], // Convert back to revenue
      });
    }
  }
  
  pairs.sort((a, b) => a.cost - b.cost); // Sort by cost ascending
  
  // Assign greedily
  for (const pair of pairs) {
    if (!usedTerritories.has(pair.territoryIdx) && !usedReps.has(pair.repIdx)) {
      assignments.push({
        sales_rep: expandedReps[pair.repIdx],
        territory: territories[pair.territoryIdx].region,
        predicted_revenue: pair.revenue,
      });
      usedTerritories.add(pair.territoryIdx);
      usedReps.add(pair.repIdx);
    }
  }
  
  return assignments;
};

// Import greedy for fallback
import greedyAssignment from './greedyAssignment.js';

export default hungarianAssignment;

