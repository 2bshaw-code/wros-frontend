# WROS Console – Frontend

A production-ready React + TypeScript dashboard for the WROS platform.

## Tech Stack

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **React Router v6** — client-side routing
- **Axios** — API client with auth interceptors
- **Zustand** — global state (auth + theme)
- **Lucide React** — icons

## Routes

| Path         | Access    | Description          |
|--------------|-----------|----------------------|
| `/login`     | Public    | Sign-in page         |
| `/register`  | Public    | Registration page    |
| `/dashboard` | Protected | Overview & stats     |
| `/crm`       | Protected | Contact management   |
| `/docs`      | Protected | Documentation        |
| `/legal`     | Protected | Legal documents      |
| `/settings`  | Protected | Account & preferences|

## Getting Started

```bash
# Install dependencies
npm install

# Copy env and configure API URL
cp .env.example .env

# Start development server
npm run dev

# Production build
npm run build
```

## Environment Variables

| Variable       | Default                        | Description    |
|----------------|--------------------------------|----------------|
| `VITE_API_URL` | `https://api.wros.co.uk/api`   | Backend API URL|

## Deploy to Render

| Setting         | Value                         |
|-----------------|-------------------------------|
| **Build command** | `npm install && npm run build` |
| **Publish dir** | `dist`                        |

Add `VITE_API_URL` as an environment variable in the Render dashboard.
