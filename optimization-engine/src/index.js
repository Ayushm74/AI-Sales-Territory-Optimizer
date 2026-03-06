/**
 * Optimization Engine
 * Standalone service for territory optimization (optional)
 * Can be used as a separate microservice or integrated into backend
 */

import express from 'express';
import cors from 'cors';
import { optimize } from './services/territoryOptimizer.js';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

/**
 * Health check
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Optimization Engine' });
});

/**
 * Optimize territories
 * POST /optimize
 */
app.post('/optimize', (req, res) => {
  try {
    const { territories, salesReps, algorithm, maxTerritoriesPerRep } = req.body;
    
    if (!territories || !salesReps) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters: territories, salesReps'
      });
    }
    
    const result = optimize({
      territories,
      salesReps,
      algorithm: algorithm || 'greedy',
      maxTerritoriesPerRep: maxTerritoriesPerRep || 2,
    });
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ESM-friendly "run as main" check
const isMain = process.argv[1] && process.argv[1] === fileURLToPath(import.meta.url);

if (isMain) {
  app.listen(PORT, () => {
    console.log(`🚀 Optimization Engine running on port ${PORT}`);
  });
}

export default app;

