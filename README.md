# AI Sales Territory Optimizer

A production-grade AI-powered system that analyzes sales data, predicts revenue potential of territories using machine learning, and recommends optimal territory assignments for sales representatives using optimization algorithms.

## Features

- 📊 **Data Upload**: Upload and validate sales and territory CSV datasets
- 📈 **Territory Analysis**: Analyze territory performance with comprehensive analytics
- 🤖 **Revenue Prediction**: ML-powered revenue prediction using RandomForestRegressor
- 🎯 **Territory Optimization**: Multiple optimization algorithms (Greedy, Hungarian, Linear Programming)
- 📱 **Interactive Dashboard**: Beautiful React dashboard with charts and maps
- 🗺️ **Map Visualization**: Visualize territories and assignments on interactive maps

## Tech Stack

### Frontend
- React (Vite)
- TailwindCSS
- Recharts
- React Router
- React Leaflet

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL

### Machine Learning
- Python
- Pandas
- Scikit-learn
- RandomForestRegressor

### Optimization
- Greedy Algorithm
- Hungarian Algorithm
- Linear Programming

### Deployment
- Docker
- Docker Compose

## Project Structure

```
ai-sales-territory-optimizer/
├── frontend/          # React frontend application
├── backend/           # Node.js + Express API
├── ml-service/        # Python ML service
├── optimization-engine/ # Territory optimization algorithms
├── database/          # Database migrations and schema
├── docs/              # Documentation
├── docker-compose.yml # Docker orchestration
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python (v3.9+)
- PostgreSQL (v14+)
- Docker & Docker Compose (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-sales-territory-optimizer
```

2. Install dependencies:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# ML Service
cd ../ml-service
pip install -r requirements.txt
```

3. Set up environment variables:

```bash
# Copy .env.example to .env and configure
cp .env.example .env
```

4. Set up database:

```bash
# Run migrations
cd database
psql -U postgres -d sales_territory_db -f migrations/create_sales_table.sql
psql -U postgres -d sales_territory_db -f migrations/create_territory_table.sql
psql -U postgres -d sales_territory_db -f migrations/create_assignments_table.sql
```

5. Start services:

```bash
# Using Docker Compose (recommended)
docker-compose up -d

# Or manually:
# Terminal 1: Backend
cd backend && npm start

# Terminal 2: Frontend
cd frontend && npm run dev

# Terminal 3: ML Service
cd ml-service && python src/api/app.py
```

## Usage

1. **Upload Data**: Navigate to `/upload` and upload your sales and territory CSV files
2. **Analyze**: View territory performance analysis on `/territory-analysis`
3. **Predict**: Generate revenue predictions on `/predictions`
4. **Optimize**: Run optimization algorithms on `/optimization`
5. **Dashboard**: View comprehensive dashboard on `/dashboard`

## API Endpoints

- `POST /api/upload-sales-data` - Upload sales data CSV
- `GET /api/territory-analysis` - Get territory performance analysis
- `POST /api/predict-revenue` - Predict revenue for territories
- `POST /api/optimize-territories` - Run territory optimization
- `GET /api/assignments` - Get optimized assignments

## Development

### Running Tests

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

### Building for Production

```bash
# Frontend
cd frontend && npm run build

# Backend
cd backend && npm run build
```

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

