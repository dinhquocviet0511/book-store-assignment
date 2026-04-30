# BookHaven Assignment

BookHaven is a small online bookshop assignment with a NestJS API, PostgreSQL database, and Next.js frontend.

## Run Locally

```bash
npm install
docker compose up -d
npm run db:schema
npm run db:seed
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api/books

## Scripts

- `npm run dev` starts backend and frontend together.
- `npm run dev:backend` starts NestJS on port 3001.
- `npm run dev:frontend` starts Next.js on port 3000.
- `npm run db:schema` applies the Prisma migration locally.
- `npm run db:seed` inserts the 10 seeded books.
- `npm test` runs the 11 Jest tests across the backend and frontend.
