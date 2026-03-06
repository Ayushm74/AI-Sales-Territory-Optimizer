import csv from 'csv-parser';
import { Readable } from 'stream';

/**
 * CSV Service
 * Handles CSV parsing and processing
 */

/**
 * Parse CSV buffer to JSON
 * @param {Buffer} buffer - CSV file buffer
 * @returns {Promise<Array>} Parsed records
 */
export const parseCSV = (buffer) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const stream = Readable.from(buffer.toString());
    
    stream
      .pipe(csv())
      .on('data', (data) => {
        // Normalize field names (handle spaces, case)
        const normalized = {};
        for (const key in data) {
          const normalizedKey = key.trim().toLowerCase().replace(/\s+/g, '_');
          normalized[normalizedKey] = data[key].trim();
        }
        results.push(normalized);
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

/**
 * Parse sales data CSV
 * @param {Buffer} buffer - CSV file buffer
 * @returns {Promise<Array>} Parsed sales records
 */
export const parseSalesCSV = async (buffer) => {
  const records = await parseCSV(buffer);
  
  // Transform and validate
  return records.map(record => ({
    sales_rep: record.sales_rep || record.salesrep,
    region: record.region,
    revenue: parseFloat(record.revenue) || 0,
    deals: parseInt(record.deals) || 0,
    customers: parseInt(record.customers) || 0,
  }));
};

/**
 * Parse territory data CSV
 * @param {Buffer} buffer - CSV file buffer
 * @returns {Promise<Array>} Parsed territory records
 */
export const parseTerritoryCSV = async (buffer) => {
  const records = await parseCSV(buffer);
  
  // Transform and validate
  return records.map(record => ({
    region: record.region,
    market_size: parseFloat(record.market_size || record.marketsize) || 0,
  }));
};

export default { parseCSV, parseSalesCSV, parseTerritoryCSV };

