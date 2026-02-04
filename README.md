# Jivo

A minimal life-experience sharing platform.

## Project structure

- `server/` Express + MongoDB API
- `client/` React + Vite + Tailwind UI

## Setup

### Backend

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## Environment variables

Create `server/.env`:

```
MONGO_URI=mongodb://localhost:27017/jivo
JWT_SECRET=your_secret
PORT=5000
```

Create `client/.env` if using a custom API URL:

```
VITE_API_URL=http://localhost:5000
```

## Run commands

- Backend: `npm run dev` (development), `npm run build` then `npm start` (production)
- Frontend: `npm run dev`, `npm run build`, `npm run preview`
