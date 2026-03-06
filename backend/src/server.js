import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { config } from './config/env.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';
import logger from './utils/logger.js';

// Routes
import uploadRoutes from './routes/uploadRoutes.js';
import territoryRoutes from './routes/territoryRoutes.js';
import analysisRoutes from './routes/analysisRoutes.js';
import predictionRoutes from './routes/predictionRoutes.js';
import optimizationRoutes from './routes/optimizationRoutes.js';

dotenv.config();

const app = express();
const PORT = config.server.port;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
// Upload endpoints:
// POST /api/upload-sales-data
// POST /api/upload-territory-data
app.use('/api', uploadRoutes);
app.use('/api/territories', territoryRoutes);
app.use('/api/territory-analysis', analysisRoutes);
app.use('/api/predict-revenue', predictionRoutes);
app.use('/api/optimize-territories', optimizationRoutes);
app.use('/api/assignments', optimizationRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`📊 Environment: ${config.server.nodeEnv}`);
  logger.info(`🔗 API available at http://localhost:${PORT}/api`);
});

export default app;

