## Local Development

### Option A: Docker Compose (recommended)

From repo root:

```bash
docker-compose up --build
```

Services:
- Postgres: `localhost:5432`
- Backend: `localhost:5000`
- ML service: `localhost:5001`
- Frontend: `localhost:3000`

### Option B: Run services manually

#### Database

Run PostgreSQL locally and create `sales_territory_db`, then apply migrations:

```bash
psql -U postgres -d sales_territory_db -f database/migrations/create_sales_table.sql
psql -U postgres -d sales_territory_db -f database/migrations/create_territory_table.sql
psql -U postgres -d sales_territory_db -f database/migrations/create_assignments_table.sql
```

#### Backend

```bash
cd backend
npm install
npm run dev
```

#### ML service

```bash
cd ml-service
pip install -r requirements.txt
python src/api/app.py
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```


