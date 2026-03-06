import { SalesData } from '../models/SalesData.js';
import { Territory } from '../models/Territory.js';
import { successResponse, errorResponse } from '../utils/responseFormatter.js';
import logger from '../utils/logger.js';

/**
 * Territory Controller
 * Handles territory-related operations
 */

/**
 * Get all territories
 * GET /api/territories
 */
export const getAllTerritories = async (req, res, next) => {
  try {
    const territories = await Territory.findAll();
    return successResponse(res, territories, 'Territories retrieved successfully');
  } catch (error) {
    logger.error('Get territories error:', error);
    next(error);
  }
};

/**
 * Get all sales data
 * GET /api/sales-data
 */
export const getAllSalesData = async (req, res, next) => {
  try {
    const salesData = await SalesData.findAll();
    return successResponse(res, salesData, 'Sales data retrieved successfully');
  } catch (error) {
    logger.error('Get sales data error:', error);
    next(error);
  }
};

export default { getAllTerritories, getAllSalesData };

