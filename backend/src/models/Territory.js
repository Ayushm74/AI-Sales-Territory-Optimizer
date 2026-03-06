import { query, getClient } from '../config/db.js';

/**
 * Territory Data Model
 * Handles all database operations for territory data
 */
export class Territory {
  /**
   * Insert territory data from CSV
   * @param {Array} records - Array of territory records
   * @returns {Promise} Insert result
   */
  static async bulkInsert(records) {
    const client = await getClient();
    try {
      await client.query('BEGIN');
      
      // Clear existing data
      await client.query('TRUNCATE TABLE territory_data RESTART IDENTITY');
      
      // Insert new records
      const insertQuery = `
        INSERT INTO territory_data (region, market_size)
        VALUES ($1, $2)
        ON CONFLICT (region) 
        DO UPDATE SET market_size = EXCLUDED.market_size, updated_at = CURRENT_TIMESTAMP
      `;
      
      for (const record of records) {
        await client.query(insertQuery, [
          record.region,
          record.market_size,
        ]);
      }
      
      await client.query('COMMIT');
      return { success: true, count: records.length };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Get all territory data
   * @returns {Promise} All territory records
   */
  static async findAll() {
    const result = await query('SELECT * FROM territory_data ORDER BY region');
    return result.rows;
  }

  /**
   * Get territory by region
   * @param {string} region - Region name
   * @returns {Promise} Territory record
   */
  static async findByRegion(region) {
    const result = await query(
      'SELECT * FROM territory_data WHERE region = $1',
      [region]
    );
    return result.rows[0];
  }

  /**
   * Update predicted revenue for a territory
   * @param {string} region - Region name
   * @param {number} predictedRevenue - Predicted revenue
   * @returns {Promise} Update result
   */
  static async updatePredictedRevenue(region, predictedRevenue) {
    const result = await query(
      'UPDATE territory_data SET predicted_revenue = $1, updated_at = CURRENT_TIMESTAMP WHERE region = $2 RETURNING *',
      [predictedRevenue, region]
    );
    return result.rows[0];
  }

  /**
   * Update predicted revenue for multiple territories
   * @param {Array} predictions - Array of {region, predicted_revenue}
   * @returns {Promise} Update result
   */
  static async bulkUpdatePredictedRevenue(predictions) {
    const client = await getClient();
    try {
      await client.query('BEGIN');
      
      for (const pred of predictions) {
        await client.query(
          'UPDATE territory_data SET predicted_revenue = $1, updated_at = CURRENT_TIMESTAMP WHERE region = $2',
          [pred.predicted_revenue, pred.region]
        );
      }
      
      await client.query('COMMIT');
      return { success: true, count: predictions.length };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}

