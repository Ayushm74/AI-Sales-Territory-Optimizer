import { parseSalesCSV, parseTerritoryCSV } from '../services/csvService.js';
import { validateSalesCSV, validateTerritoryCSV } from '../middlewares/validateCSV.js';
import { SalesData } from '../models/SalesData.js';
import { Territory } from '../models/Territory.js';
import { successResponse, errorResponse } from '../utils/responseFormatter.js';
import logger from '../utils/logger.js';

/**
 * Upload Controller
 * Handles CSV file uploads and data processing
 */

/**
 * Upload sales data CSV
 * POST /api/upload-sales-data
 */
export const uploadSalesData = async (req, res, next) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'No file uploaded', 400);
    }

    logger.info('Processing sales data upload', { filename: req.file.originalname });

    // Parse CSV
    const records = await parseSalesCSV(req.file.buffer);

    // Validate CSV structure
    const validation = validateSalesCSV(records);
    if (!validation.valid) {
      return errorResponse(res, validation.error, 400);
    }

    // Save to database
    const result = await SalesData.bulkInsert(records);

    logger.info('Sales data uploaded successfully', { count: result.count });

    return successResponse(
      res,
      {
        records: records.slice(0, 10), // Return first 10 for preview
        totalRecords: result.count,
      },
      'Sales data uploaded successfully'
    );
  } catch (error) {
    logger.error('Upload sales data error:', error);
    next(error);
  }
};

/**
 * Upload territory data CSV
 * POST /api/upload-territory-data
 */
export const uploadTerritoryData = async (req, res, next) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'No file uploaded', 400);
    }

    logger.info('Processing territory data upload', { filename: req.file.originalname });

    // Parse CSV
    const records = await parseTerritoryCSV(req.file.buffer);

    // Validate CSV structure
    const validation = validateTerritoryCSV(records);
    if (!validation.valid) {
      return errorResponse(res, validation.error, 400);
    }

    // Save to database
    const result = await Territory.bulkInsert(records);

    logger.info('Territory data uploaded successfully', { count: result.count });

    return successResponse(
      res,
      {
        records: records.slice(0, 10), // Return first 10 for preview
        totalRecords: result.count,
      },
      'Territory data uploaded successfully'
    );
  } catch (error) {
    logger.error('Upload territory data error:', error);
    next(error);
  }
};

export default { uploadSalesData, uploadTerritoryData };

