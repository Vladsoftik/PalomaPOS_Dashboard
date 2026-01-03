import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Helper functions for API routes
function extractTitle(content: string): string {
  const lines = content.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('# ')) {
      return trimmed.substring(2).trim()
    }
  }
  return 'Untitled'
}

function extractSections(content: string): string[] {
  const sections: string[] = []
  const lines = content.split('\n')
  
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('## ')) {
      sections.push(trimmed.substring(3).trim())
    } else if (trimmed.startsWith('### ')) {
      sections.push(trimmed.substring(4).trim())
    }
  }
  
  return sections
}

const DOCS_API_KEY = 'a02cb62a06c3df3dc7635bbdc2e79d5e9c325bfdbe0f24a6616bcd8ee8c6ede2'

export default defineConfig({
  root: '.',
  plugins: [
    react(),
    // Plugin to handle API routes locally
    {
      name: 'api-routes-handler',
      configureServer(server) {
        // Handle /api/docs/:filename route
        server.middlewares.use('/api/docs', async (req, res, next) => {
          if (!req.url) {
            next()
            return
          }
          
          // Parse URL
          const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`)
          const pathname = url.pathname
          
          // Extract filename from pathname (e.g., /api/docs/STYLING_GUIDELINES.md -> STYLING_GUIDELINES.md)
          const filenameMatch = pathname.match(/\/api\/docs\/(.+)$/)
          const filename = filenameMatch ? decodeURIComponent(filenameMatch[1]) : null
          
          // Get API key from query or header
          const apiKey = url.searchParams.get('key') || (req.headers['x-api-key'] as string)
          
          // Verify API key
          if (!apiKey || apiKey !== DOCS_API_KEY) {
            res.writeHead(401, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
              success: false,
              error: 'Unauthorized - Invalid API key',
            }))
            return
          }
          
          // Handle specific filename request
          if (filename) {
            const sanitizedFilename = path.basename(filename)
            const docsPath = path.join(process.cwd(), 'docs_unified', sanitizedFilename)
            
            if (!fs.existsSync(docsPath)) {
              res.writeHead(404, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({
                success: false,
                error: 'Documentation file not found',
              }))
              return
            }
            
            try {
              const content = fs.readFileSync(docsPath, 'utf-8')
              const title = extractTitle(content)
              const sections = extractSections(content)
              
              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({
                success: true,
                data: {
                  filename: sanitizedFilename,
                  content,
                  title,
                  sections,
                },
              }))
            } catch (error) {
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({
                success: false,
                error: 'Error reading documentation file',
              }))
            }
            return
          }
          
          // Handle /api/docs (list all files) or /api/docs/all
          if (pathname === '/api/docs' || pathname === '/api/docs/all') {
            const docsPath = path.join(process.cwd(), 'docs_unified')
            
            if (!fs.existsSync(docsPath)) {
              res.writeHead(404, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({
                success: false,
                error: 'Documentation directory not found',
              }))
              return
            }
            
            try {
              const files = fs.readdirSync(docsPath).filter((file) => file.endsWith('.md'))
              
              if (pathname === '/api/docs/all') {
                // Return all documentation
                const documentation: Record<string, any> = {}
                for (const file of files) {
                  const filePath = path.join(docsPath, file)
                  const content = fs.readFileSync(filePath, 'utf-8')
                  documentation[file] = {
                    content,
                    title: extractTitle(content),
                    sections: extractSections(content),
                  }
                }
                
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({
                  success: true,
                  data: { documentation },
                }))
              } else {
                // Return file list
                const documentationFiles = files.map((file) => {
                  const filePath = path.join(docsPath, file)
                  const content = fs.readFileSync(filePath, 'utf-8')
                  return {
                    name: file,
                    title: extractTitle(content),
                    description: content.split('\n').find(line => line.trim() && !line.startsWith('#'))?.substring(0, 200) || 'No description',
                    category: 'General',
                  }
                })
                
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({
                  success: true,
                  data: { files: documentationFiles },
                }))
              }
            } catch (error) {
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({
                success: false,
                error: 'Error reading documentation',
              }))
            }
            return
          }
          
          next()
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

