import { query, getClient } from '../config/db.js';

/**
 * Sales Data Model
 * Handles all database operations for sales data
 */
export class SalesData {
  /**
   * Insert sales data from CSV
   * @param {Array} records - Array of sales records
   * @returns {Promise} Insert result
   */
  static async bulkInsert(records) {
    const client = await getClient();
    try {
      await client.query('BEGIN');
      
      // Clear existing data
      await client.query('TRUNCATE TABLE sales_data RESTART IDENTITY');
      
      // Insert new records
      const insertQuery = `
        INSERT INTO sales_data (sales_rep, region, revenue, deals, customers)
        VALUES ($1, $2, $3, $4, $5)
      `;
      
      for (const record of records) {
        await client.query(insertQuery, [
          record.sales_rep,
          record.region,
          record.revenue,
          record.deals,
          record.customers,
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
   * Get all sales data
   * @returns {Promise} All sales records
   */
  static async findAll() {
    const result = await query('SELECT * FROM sales_data ORDER BY created_at DESC');
    return result.rows;
  }

  /**
   * Get sales data by region
   * @param {string} region - Region name
   * @returns {Promise} Sales records for region
   */
  static async findByRegion(region) {
    const result = await query(
      'SELECT * FROM sales_data WHERE region = $1',
      [region]
    );
    return result.rows;
  }

  /**
   * Get sales data by sales rep
   * @param {string} salesRep - Sales rep name
   * @returns {Promise} Sales records for rep
   */
  static async findBySalesRep(salesRep) {
    const result = await query(
      'SELECT * FROM sales_data WHERE sales_rep = $1',
      [salesRep]
    );
    return result.rows;
  }

  /**
   * Get aggregated sales statistics
   * @returns {Promise} Aggregated statistics
   */
  static async getStatistics() {
    const result = await query(`
      SELECT 
        COUNT(DISTINCT sales_rep) as total_reps,
        COUNT(DISTINCT region) as total_regions,
        SUM(revenue) as total_revenue,
        SUM(deals) as total_deals,
        SUM(customers) as total_customers,
        AVG(revenue) as avg_revenue
      FROM sales_data
    `);
    return result.rows[0];
  }
}

