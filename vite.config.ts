import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: '/',
    plugins: [
      react(),
      {
        name: 'wros-spa-fallbacks',
        configureServer(server) {
          const serveSpa = async (req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse, next: (error?: Error) => void) => {
            if (req.method !== 'GET') return next()
            if (/^\/(assets|@vite|@react-refresh|node_modules|src)(\/|$)/.test(req.url || '')) return next()
            if (/\.(svg|css|js|jsx|ts|tsx|map|json|ico|png|jpe?g|webp)(\?|$)/.test(req.url || '')) return next()
            try {
              const html = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8')
              const transformed = await server.transformIndexHtml(req.url || '/', html)
              res.statusCode = 200
              res.setHeader('Content-Type', 'text/html')
              res.end(transformed)
            } catch (error) {
              next(error as Error)
            }
          }
          server.middlewares.use(serveSpa)
        },
      },
    ],
    define: {
      'import.meta.env.API_URL': JSON.stringify(env.VITE_API_URL || 'https://wros-backend.onrender.com/api'),
    },
    server: {
      port: 5173,
      watch: {
        ignored: ['**/wros-backend/**', '**/node_modules/**', '**/dist/**', '**/.env*'],
      },
      proxy: { '/api': { target: 'https://wros-backend.onrender.com', changeOrigin: true } },
    },
  }
})