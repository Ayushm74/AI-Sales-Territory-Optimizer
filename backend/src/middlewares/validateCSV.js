/**
 * CSV validation middleware
 * Validates CSV structure and required columns
 */

/**
 * Validate sales data CSV structure
 * @param {Array} records - Parsed CSV records
 * @param {Array} requiredFields - Required field names
 * @returns {Object} Validation result
 */
export const validateSalesCSV = (records, requiredFields = ['sales_rep', 'region', 'revenue', 'deals', 'customers']) => {
  if (!records || records.length === 0) {
    return { valid: false, error: 'CSV file is empty' };
  }

  // Check if all records have required fields
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    for (const field of requiredFields) {
      if (!(field in record) || record[field] === undefined || record[field] === '') {
        return { 
          valid: false, 
          error: `Missing required field '${field}' in row ${i + 2}` 
        };
      }
    }

    // Validate data types
    if (isNaN(parseFloat(record.revenue))) {
      return { valid: false, error: `Invalid revenue value in row ${i + 2}` };
    }
    if (isNaN(parseInt(record.deals))) {
      return { valid: false, error: `Invalid deals value in row ${i + 2}` };
    }
    if (isNaN(parseInt(record.customers))) {
      return { valid: false, error: `Invalid customers value in row ${i + 2}` };
    }
  }

  return { valid: true };
};

/**
 * Validate territory data CSV structure
 * @param {Array} records - Parsed CSV records
 * @param {Array} requiredFields - Required field names
 * @returns {Object} Validation result
 */
export const validateTerritoryCSV = (records, requiredFields = ['region', 'market_size']) => {
  if (!records || records.length === 0) {
    return { valid: false, error: 'CSV file is empty' };
  }

  // Check if all records have required fields
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    for (const field of requiredFields) {
      if (!(field in record) || record[field] === undefined || record[field] === '') {
        return { 
          valid: false, 
          error: `Missing required field '${field}' in row ${i + 2}` 
        };
      }
    }

    // Validate data types
    if (isNaN(parseFloat(record.market_size))) {
      return { valid: false, error: `Invalid market_size value in row ${i + 2}` };
    }
  }

  return { valid: true };
};

export default { validateSalesCSV, validateTerritoryCSV };

