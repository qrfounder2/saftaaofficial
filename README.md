# Saftaa Care Hub (Self-Hosted)

This project is now fully self-hosted and independent from Base44.
You own and run:

- frontend (Vite + React)
- backend API (`/api/orders`) for order intake
- local order persistence in `storage/orders.json`
- Docker deployment for EasyPanel / Hostinger

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Run frontend dev mode:

```bash
npm run dev
```

3. Build production assets:

```bash
npm run build
```

4. Run production server locally:

```bash
npm start
```

The production server runs on `http://localhost:3000` by default.

## API Endpoints

- `GET /api/health` - health check
- `POST /api/orders` - create order (saved to `storage/orders.json`)

## EasyPanel (Hostinger) Deployment

### Option A: Dockerfile deployment (recommended)

1. Create a new EasyPanel app from this repository.
2. Select Dockerfile deployment.
3. Expose port `3000`.
4. Add persistent volume mounted to `/app/storage` (to preserve orders).
5. Set domain and SSL in EasyPanel.

### Option B: Node build/run commands

- Build command: `npm install && npm run build`
- Start command: `npm start`
- Port: `3000`

## Ownership Notes

- No Base44 SDK or Base44 Vite plugin is required.
- Product catalog is maintained in `src/data/products.js`.
- Creative theme tokens and visual style are in `src/index.css`.
