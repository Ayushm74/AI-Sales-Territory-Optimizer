/**
 * Linear Programming Assignment
 * Uses linear programming approach for territory assignment
 * 
 * Note: This is a simplified implementation. For production, consider using
 * a proper LP solver like 'javascript-lp-solver' or similar
 */

/**
 * Linear programming assignment
 * Maximizes total revenue subject to constraints
 * 
 * @param {Array} territories - Array of {region, predicted_revenue, market_size}
 * @param {Array} salesReps - Array of sales rep names
 * @param {number} maxTerritoriesPerRep - Maximum territories per rep
 * @returns {Array} Array of assignments {sales_rep, territory, predicted_revenue}
 */
export const linearProgrammingAssignment = (territories, salesReps, maxTerritoriesPerRep = 2) => {
  // Simplified LP: Use greedy with LP-inspired scoring
  // A full LP implementation would require a solver library
  
  // Create assignment variables and constraints
  const assignments = [];
  const repTerritoryCount = {};
  const repTotalRevenue = {};
  
  // Initialize
  salesReps.forEach(rep => {
    repTerritoryCount[rep] = 0;
    repTotalRevenue[rep] = 0;
  });
  
  // Score each territory-rep pair
  const pairs = [];
  territories.forEach(territory => {
    salesReps.forEach(rep => {
      const revenue = territory.predicted_revenue || 0;
      const marketSize = territory.market_size || 0;
      
      // LP-inspired score: maximize revenue while balancing load
      const loadFactor = repTerritoryCount[rep] / maxTerritoriesPerRep;
      const score = revenue * (1 - loadFactor * 0.3) + marketSize * 0.1;
      
      pairs.push({
        territory,
        rep,
        revenue,
        score,
      });
    });
  });
  
  // Sort by score (descending)
  pairs.sort((a, b) => b.score - a.score);
  
  // Assign greedily based on score
  const assignedTerritories = new Set();
  
  for (const pair of pairs) {
    if (assignedTerritories.has(pair.territory.region)) continue;
    if (repTerritoryCount[pair.rep] >= maxTerritoriesPerRep) continue;
    
    assignments.push({
      sales_rep: pair.rep,
      territory: pair.territory.region,
      predicted_revenue: pair.revenue,
    });
    
    assignedTerritories.add(pair.territory.region);
    repTerritoryCount[pair.rep]++;
    repTotalRevenue[pair.rep] += pair.revenue;
  }
  
  return assignments;
};

export default linearProgrammingAssignment;

