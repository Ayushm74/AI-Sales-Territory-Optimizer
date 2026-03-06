import { getTerritoryAnalysis } from '../services/territoryAnalysisService.js';
import { successResponse, errorResponse } from '../utils/responseFormatter.js';
import logger from '../utils/logger.js';

/**
 * Analysis Controller
 * Handles territory performance analysis
 */

/**
 * Get territory analysis
 * GET /api/territory-analysis
 */
export const getAnalysis = async (req, res, next) => {
  try {
    logger.info('Generating territory analysis');
    
    const analysis = await getTerritoryAnalysis();
    
    return successResponse(
      res,
      analysis,
      'Territory analysis generated successfully'
    );
  } catch (error) {
    logger.error('Territory analysis error:', error);
    next(error);
  }
};

export default { getAnalysis };

