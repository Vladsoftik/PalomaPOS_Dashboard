import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: '.',
  plugins: [
    react(),
    // Plugin to handle API routes and return helpful error
    {
      name: 'api-routes-handler',
      configureServer(server) {
        server.middlewares.use('/api', (req, res, next) => {
          res.writeHead(404, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({
            success: false,
            error: 'API routes are Vercel serverless functions. For local development, use "vercel dev" instead of "npm run dev". API routes only work when deployed to Vercel or when using "vercel dev".'
          }))
        })
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './frontend/src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    // Deny access to api folder
    fs: {
      deny: [path.resolve(__dirname, './api')],
    },
  },
  // Exclude Node.js modules from optimization
  optimizeDeps: {
    exclude: ['fs', 'path', '@vercel/node'],
  },
})

