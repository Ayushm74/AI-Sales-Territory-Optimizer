import express from 'express';
import { getAnalysis } from '../controllers/analysisController.js';

const router = express.Router();

/**
 * Analysis Routes
 * Handles territory performance analysis
 */

// Get territory analysis
router.get('/', getAnalysis);

export default router;

