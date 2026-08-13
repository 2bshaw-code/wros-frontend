# WROS Console Frontend

WROS Console frontend built with Vite, React, and TypeScript.

## Routes

- `/login`
- `/register`
- `/dashboard`
- `/crm`
- `/docs`
- `/legal`
- `/settings`

## Features

- JWT authentication (login and register)
- Protected routes (redirects to `/login` when unauthenticated)
- Sidebar navigation with active route state
- Responsive dashboard layout
- Light/dark theme toggle
- Global state management with Zustand
- Axios API client with `VITE_API_URL`

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Render settings

- Build command: `npm install && npm run build`
- Publish directory: `dist`

## Environment variables

- `VITE_API_URL=https://api.wros.co.uk/api`
- `HOSTING_URL=https://console.wros.co.uk`
