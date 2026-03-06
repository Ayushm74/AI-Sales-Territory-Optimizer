/**
 * Greedy Assignment Algorithm
 * Assigns territories to sales reps greedily based on predicted revenue
 */

/**
 * Greedy assignment algorithm
 * Assigns highest revenue territories first to reps with fewest assignments
 * 
 * @param {Array} territories - Array of {region, predicted_revenue, market_size}
 * @param {Array} salesReps - Array of sales rep names
 * @param {number} maxTerritoriesPerRep - Maximum territories per rep
 * @returns {Array} Array of assignments {sales_rep, territory, predicted_revenue}
 */
export const greedyAssignment = (territories, salesReps, maxTerritoriesPerRep = 2) => {
  // Sort territories by predicted revenue (descending)
  const sortedTerritories = [...territories].sort((a, b) => 
    (b.predicted_revenue || 0) - (a.predicted_revenue || 0)
  );

  const assignments = [];
  const repTerritoryCount = {};
  const repTotalRevenue = {};
  
  // Initialize rep counts and revenue
  salesReps.forEach(rep => {
    repTerritoryCount[rep] = 0;
    repTotalRevenue[rep] = 0;
  });

  // Assign territories greedily
  for (const territory of sortedTerritories) {
    // Find rep with fewest territories (and lowest total revenue if tied)
    let bestRep = null;
    let minCount = Infinity;
    let minRevenue = Infinity;

    for (const rep of salesReps) {
      const count = repTerritoryCount[rep];
      const revenue = repTotalRevenue[rep];
      
      if (count < maxTerritoriesPerRep) {
        if (count < minCount || (count === minCount && revenue < minRevenue)) {
          minCount = count;
          minRevenue = revenue;
          bestRep = rep;
        }
      }
    }

    if (bestRep) {
      assignments.push({
        sales_rep: bestRep,
        territory: territory.region,
        predicted_revenue: territory.predicted_revenue || 0,
      });
      repTerritoryCount[bestRep]++;
      repTotalRevenue[bestRep] += territory.predicted_revenue || 0;
    }
  }

  return assignments;
};

export default greedyAssignment;

