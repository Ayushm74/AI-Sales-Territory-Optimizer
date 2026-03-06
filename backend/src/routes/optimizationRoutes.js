import express from 'express';
import { optimizeTerritoryAssignments, getAssignments } from '../controllers/optimizationController.js';

const router = express.Router();

/**
 * Optimization Routes
 * Handles territory optimization operations
 */

// Optimize territory assignments
router.post('/', optimizeTerritoryAssignments);

// Get optimized assignments
router.get('/', getAssignments);

export default router;

