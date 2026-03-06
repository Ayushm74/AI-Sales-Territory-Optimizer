import multer from 'multer';
import { errorResponse } from '../utils/responseFormatter.js';
import logger from '../utils/logger.js';

/**
 * Global error handler middleware
 * Handles all errors and formats error responses
 */
export const errorHandler = (err, req, res, next) => {
  logger.error('Error:', err);

  // Multer errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return errorResponse(res, 'File too large. Maximum size is 10MB', 400);
    }
    return errorResponse(res, err.message, 400);
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return errorResponse(res, 'Validation error', 400, err.errors);
  }

  // Database errors
  if (err.code === '23505') { // Unique violation
    return errorResponse(res, 'Duplicate entry', 409);
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  
  return errorResponse(res, message, statusCode);
};

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (req, res) => {
  return errorResponse(res, `Route ${req.originalUrl} not found`, 404);
};

export default { errorHandler, notFoundHandler };

