import { SalesData } from '../models/SalesData.js';
import { Territory } from '../models/Territory.js';
import { query } from '../config/db.js';

/**
 * Territory Analysis Service
 * Computes analytics and performance metrics
 */

/**
 * Get comprehensive territory analysis
 * @returns {Promise<Object>} Analysis results
 */
export const getTerritoryAnalysis = async () => {
  // Get all sales data
  const salesData = await SalesData.findAll();
  const territoryData = await Territory.findAll();

  // Revenue per region
  const revenueByRegion = await query(`
    SELECT 
      region,
      SUM(revenue) as total_revenue,
      SUM(deals) as total_deals,
      SUM(customers) as total_customers,
      COUNT(DISTINCT sales_rep) as rep_count,
      AVG(revenue) as avg_revenue
    FROM sales_data
    GROUP BY region
    ORDER BY total_revenue DESC
  `);

  // Revenue per sales rep
  const revenueByRep = await query(`
    SELECT 
      sales_rep,
      SUM(revenue) as total_revenue,
      SUM(deals) as total_deals,
      SUM(customers) as total_customers,
      COUNT(DISTINCT region) as territory_count,
      AVG(revenue) as avg_revenue
    FROM sales_data
    GROUP BY sales_rep
    ORDER BY total_revenue DESC
  `);

  // Market potential vs actual revenue
  const marketAnalysis = await query(`
    SELECT 
      t.region,
      t.market_size,
      COALESCE(SUM(s.revenue), 0) as actual_revenue,
      t.market_size - COALESCE(SUM(s.revenue), 0) as opportunity_gap,
      CASE 
        WHEN t.market_size > 0 THEN 
          (COALESCE(SUM(s.revenue), 0) / t.market_size) * 100 
        ELSE 0 
      END as penetration_rate
    FROM territory_data t
    LEFT JOIN sales_data s ON t.region = s.region
    GROUP BY t.region, t.market_size
    ORDER BY opportunity_gap DESC
  `);

  // Territory scoring
  const territoryScores = await query(`
    SELECT 
      t.region,
      t.market_size,
      COALESCE(SUM(s.revenue), 0) as revenue,
      COALESCE(SUM(s.deals), 0) as deals,
      (
        0.5 * COALESCE(SUM(s.revenue), 0) +
        0.3 * COALESCE(SUM(s.deals), 0) +
        0.2 * t.market_size
      ) as score
    FROM territory_data t
    LEFT JOIN sales_data s ON t.region = s.region
    GROUP BY t.region, t.market_size
    ORDER BY score DESC
  `);

  // Overall statistics
  const stats = await SalesData.getStatistics();

  return {
    revenueByRegion: revenueByRegion.rows,
    revenueByRep: revenueByRep.rows,
    marketAnalysis: marketAnalysis.rows,
    territoryScores: territoryScores.rows,
    statistics: stats,
  };
};

/**
 * Calculate territory score
 * Formula: 0.5 * revenue + 0.3 * deals + 0.2 * market_size
 * @param {Object} territory - Territory data
 * @returns {number} Territory score
 */
export const calculateTerritoryScore = (territory) => {
  const revenue = territory.revenue || 0;
  const deals = territory.deals || 0;
  const marketSize = territory.market_size || 0;
  
  return 0.5 * revenue + 0.3 * deals + 0.2 * marketSize;
};

export default { getTerritoryAnalysis, calculateTerritoryScore };

