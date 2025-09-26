# Work Experience API — Day 25

This is a scaffolded Express + Mongoose REST API for managing work experience records.

## What's included

- Full CRUD endpoints for work experiences
- Advanced query parameters (filter, pagination, sort)
- CORS configured
- Seed script to load sample mock data

## Quick start

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env` and update `MONGO_URI`.

3. Seed mock data (optional):
```bash
npm run seed
```

4. Start the server:
```bash
npm run dev
# or
npm start
```

API base: `http://localhost:4000/api/work-experiences`

See `routes/work.js` for route details.