# WROS Frontend

Vite + React + TypeScript SPA for the WROS retail operating system console.

## Local development

```bash
cp .env.example .env          # add your values
npm install
npm run dev                   # http://localhost:5173
```

## Production build

```bash
npm install && npm run build  # output: dist/
```

## Environment variables

| Variable | Description |
|---|---|
| `VITE_API_URL` | Full URL of the backend API, e.g. `https://api.wros.co.uk/api` |

> `HOSTING_URL` is documentation-only — it is not consumed at runtime by the Vite bundle.

## Deploy on Render (static site)

1. Connect the `2bshaw-code/wros-frontend` repository.
2. **Build command:** `npm install && npm run build`
3. **Publish directory:** `dist`
4. Add the env var `VITE_API_URL` pointing at your deployed backend.
5. Render's rewrite rule (`/* → /index.html 200`) is pre-configured in `render.yaml` and `public/_redirects`.

## Project structure

```
src/
  api/          axiosClient + auth API calls
  components/   Navbar, Sidebar, ErrorBoundary, Loading
  pages/        Login, Register, Dashboard, CRM, Settings, Docs, Legal, NotFound
  routes/       AppRoutes + ProtectedRoute
  state/        authStore (Zustand)
  store/        consoleStore (dark-mode + theme)
  types/        TypeScript interfaces
  utils/        helpers (formatDate, getErrorMessage)
```

