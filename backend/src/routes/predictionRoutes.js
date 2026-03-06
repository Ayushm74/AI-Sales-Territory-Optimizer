import express from 'express';
import { predictTerritoryRevenue } from '../controllers/predictionController.js';

const router = express.Router();

/**
 * Prediction Routes
 * Handles revenue prediction operations
 */

// Predict revenue for territories
router.post('/', predictTerritoryRevenue);

export default router;

