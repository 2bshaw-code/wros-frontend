# wros-frontend

WROS Console — React + Vite + TypeScript frontend.

## Analysis Summary

| Item | Value |
|------|-------|
| Framework | React 18 + Vite 6 (TypeScript) |
| Render Build Command | `npm install && npm run build` |
| Render Publish Directory | `dist` |

## A. Render Build Command

```
npm install && npm run build
```

## B. Render Publish Directory

```
dist
```

## C. package.json Scripts

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

## D. Fixes Applied Before Deployment

- Scaffolded Vite + React + TypeScript project (repository was empty).
- Added `VITE_` prefixed environment variables (Vite only exposes `VITE_*` vars to the browser bundle).
- Created `.env.production` with production values — these are also set as Render env vars in `render.yaml` so they take effect at build time on Render.
- Added `render.yaml` with SPA rewrite rule (`/* → /index.html`) so client-side routing works.
- Added `.gitignore` to exclude `node_modules`, `dist`, and local `.env` files.

## E. Render Deployment Checklist

- [ ] Push this repository to GitHub / GitLab.
- [ ] Create a new **Static Site** service on Render and connect the repository.
- [ ] Set **Build Command**: `npm install && npm run build`
- [ ] Set **Publish Directory**: `dist`
- [ ] Add environment variables in the Render dashboard (or rely on `render.yaml`):
  - `VITE_API_URL` = `https://api.wros.co.uk/api`
  - `VITE_HOSTING_URL` = `https://console.wros.co.uk`
- [ ] Confirm the SPA rewrite rule (`/* → /index.html`) is active for client-side routing.
- [ ] Deploy and verify the build completes successfully.

## Local Development

```bash
cp .env.local.example .env.local   # adjust values as needed
npm install
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL |
| `VITE_HOSTING_URL` | Public URL of the console |

> **Note:** Vite requires the `VITE_` prefix for environment variables to be embedded in the client bundle.

