import express from 'express';
import { upload } from '../middlewares/fileUploadMiddleware.js';
import { uploadSalesData, uploadTerritoryData } from '../controllers/uploadController.js';

const router = express.Router();

/**
 * Upload Routes
 * Handles CSV file uploads
 */

// Upload sales data CSV
// POST /api/upload-sales-data
router.post('/upload-sales-data', upload.single('file'), uploadSalesData);

// Upload territory data CSV
// POST /api/upload-territory-data
router.post('/upload-territory-data', upload.single('file'), uploadTerritoryData);

export default router;

