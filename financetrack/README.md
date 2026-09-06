# FinanceTrack

A data-first personal-finance portfolio app with a React/Vite client and Express/PostgreSQL API.

## Run locally

1. Create a PostgreSQL database and run the SQL in `server/db/schema.sql`.
2. Copy `server/.env.example` to `server/.env` and set `DATABASE_URL`.
3. In one terminal run `cd server; npm install; npm run dev`.
4. In a second terminal run `cd client; npm install; npm run dev`.

The client uses `http://localhost:4000` by default. Set `VITE_API_URL` for another API host.

## Architecture

The client keeps page state at the application boundary and delegates data operations to a small transaction service. The Express API validates every mutation, parses CSV imports, and passes parameterised queries to PostgreSQL. Transaction data is the single source for dashboard and analytics totals.

## API

- `GET /api/health` — API health status
- `GET /api/transactions` — list transactions
- `POST /api/transactions` — create `{ title, amount, type, category, date }`
- `PUT /api/transactions/:id` — replace a transaction
- `DELETE /api/transactions/:id` — remove a transaction
- `POST /api/transactions/import` — import CSV body with `date,title,category,type,amount`

## Production notes

Build each app with `npm run build`. Use an environment-specific database URL, restrict CORS to the deployed client origin, terminate TLS at the host, and add authentication before deploying user data. The current schema is structured to add a `user_id` foreign key without changing transaction semantics.
