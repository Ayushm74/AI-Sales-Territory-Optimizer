## Architecture Overview

The **AI Sales Territory Optimizer** is designed as a modular AI SaaS-style monorepo:

- **`frontend/`**: React (Vite) dashboard with Tailwind, charts (Recharts), and map (React Leaflet)
- **`backend/`**: Node.js + Express API that orchestrates upload, analysis, prediction, and optimization
- **`database/`**: PostgreSQL schema and migrations
- **`ml-service/`**: Python service (Flask) for training + predicting territory revenue (RandomForestRegressor)
- **`optimization-engine/`**: Node service/library implementing greedy, Hungarian-style matching, and LP-inspired assignment

### High-level flow

Upload sales CSV + territory CSV
↓
Backend stores to PostgreSQL
↓
Backend computes analytics (SQL aggregations)
↓
Backend calls ML service to generate `predicted_revenue` per territory
↓
Backend runs optimization (local service implementation; can be swapped to call optimization-engine)
↓
Frontend dashboard visualizes tables, charts, and map

### Key design principles

- **Separation of concerns**: ingestion, analytics, ML prediction, optimization, and UI are separate modules
- **Replaceable components**: optimization can be called locally or via the `optimization-engine` microservice
- **Production-friendly defaults**: Docker Compose supports local multi-service development


