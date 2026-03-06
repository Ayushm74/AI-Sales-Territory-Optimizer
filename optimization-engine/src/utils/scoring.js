/**
 * Scoring Utilities
 * Helper functions for calculating territory and assignment scores
 */

/**
 * Calculate territory score
 * Formula: 0.5 * revenue + 0.3 * deals + 0.2 * market_size
 * 
 * @param {Object} territory - Territory data
 * @returns {number} Territory score
 */
export const calculateTerritoryScore = (territory) => {
  const revenue = territory.revenue || 0;
  const deals = territory.deals || 0;
  const marketSize = territory.market_size || 0;
  
  return 0.5 * revenue + 0.3 * deals + 0.2 * marketSize;
};

/**
 * Calculate assignment quality score
 * 
 * @param {Array} assignments - Array of assignments
 * @returns {number} Quality score
 */
export const calculateAssignmentQuality = (assignments) => {
  if (assignments.length === 0) return 0;
  
  const totalRevenue = assignments.reduce(
    (sum, a) => sum + (a.predicted_revenue || 0),
    0
  );
  
  // Calculate balance (lower variance is better)
  const repRevenue = {};
  assignments.forEach(a => {
    if (!repRevenue[a.sales_rep]) {
      repRevenue[a.sales_rep] = 0;
    }
    repRevenue[a.sales_rep] += a.predicted_revenue || 0;
  });
  
  const revenues = Object.values(repRevenue);
  const avgRevenue = revenues.reduce((a, b) => a + b, 0) / revenues.length;
  const variance = revenues.reduce((sum, r) => sum + Math.pow(r - avgRevenue, 2), 0) / revenues.length;
  
  // Quality = total revenue - penalty for imbalance
  return totalRevenue - Math.sqrt(variance) * 0.1;
};

export default { calculateTerritoryScore, calculateAssignmentQuality };

