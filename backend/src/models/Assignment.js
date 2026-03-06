import { query, getClient } from '../config/db.js';

/**
 * Assignment Model
 * Handles all database operations for territory assignments
 */
export class Assignment {
  /**
   * Save assignments (clear old and insert new)
   * @param {Array} assignments - Array of assignment objects
   * @param {string} algorithmUsed - Algorithm name used
   * @returns {Promise} Insert result
   */
  static async saveAssignments(assignments, algorithmUsed = 'greedy') {
    const client = await getClient();
    try {
      await client.query('BEGIN');
      
      // Clear existing assignments
      await client.query('TRUNCATE TABLE assignments RESTART IDENTITY');
      
      // Insert new assignments
      const insertQuery = `
        INSERT INTO assignments (sales_rep, territory, predicted_revenue, algorithm_used)
        VALUES ($1, $2, $3, $4)
      `;
      
      for (const assignment of assignments) {
        await client.query(insertQuery, [
          assignment.sales_rep,
          assignment.territory,
          assignment.predicted_revenue,
          algorithmUsed,
        ]);
      }
      
      await client.query('COMMIT');
      return { success: true, count: assignments.length };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Get all assignments
   * @returns {Promise} All assignment records
   */
  static async findAll() {
    const result = await query(`
      SELECT 
        a.*,
        t.market_size
      FROM assignments a
      LEFT JOIN territory_data t ON a.territory = t.region
      ORDER BY a.sales_rep, a.territory
    `);
    return result.rows;
  }

  /**
   * Get assignments by sales rep
   * @param {string} salesRep - Sales rep name
   * @returns {Promise} Assignments for rep
   */
  static async findBySalesRep(salesRep) {
    const result = await query(
      'SELECT * FROM assignments WHERE sales_rep = $1 ORDER BY territory',
      [salesRep]
    );
    return result.rows;
  }

  /**
   * Get assignments by territory
   * @param {string} territory - Territory name
   * @returns {Promise} Assignments for territory
   */
  static async findByTerritory(territory) {
    const result = await query(
      'SELECT * FROM assignments WHERE territory = $1 ORDER BY sales_rep',
      [territory]
    );
    return result.rows;
  }

  /**
   * Get assignment statistics
   * @returns {Promise} Assignment statistics
   */
  static async getStatistics() {
    const result = await query(`
      SELECT 
        COUNT(DISTINCT sales_rep) as total_reps_assigned,
        COUNT(DISTINCT territory) as total_territories_assigned,
        SUM(predicted_revenue) as total_predicted_revenue,
        AVG(predicted_revenue) as avg_predicted_revenue,
        algorithm_used
      FROM assignments
      GROUP BY algorithm_used
    `);
    return result.rows;
  }
}

