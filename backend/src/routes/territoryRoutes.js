import express from 'express';
import { getAllTerritories, getAllSalesData } from '../controllers/territoryController.js';

const router = express.Router();

/**
 * Territory Routes
 * Handles territory and sales data retrieval
 */

// Get all territories
router.get('/', getAllTerritories);

// Get all sales data
router.get('/sales-data', getAllSalesData);

export default router;

