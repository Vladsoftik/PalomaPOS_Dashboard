import type { VercelRequest, VercelResponse } from '@vercel/node'
import fs from 'fs'
import path from 'path'

interface DocumentationFile {
  name: string
  title: string
  description: string
  category: string
}

interface ApiResponse {
  success: boolean
  data?: {
    files: DocumentationFile[]
  }
  error?: string
}

// Extract title from markdown (first # heading)
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

// Extract description (first paragraph after title)
function extractDescription(content: string): string {
  const lines = content.split('\n')
  let foundTitle = false
  
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('# ')) {
      foundTitle = true
      continue
    }
    if (foundTitle && trimmed.length > 0 && !trimmed.startsWith('#')) {
      // Return first meaningful paragraph
      return trimmed.substring(0, 200) + (trimmed.length > 200 ? '...' : '')
    }
  }
  return 'No description available'
}

// Categorize documentation file
function categorizeFile(filename: string): string {
  const categories: Record<string, string> = {
    FRONTEND_DEVELOPMENT: 'Development Patterns',
    PROJECT_STRUCTURE: 'Development Patterns',
    BEST_PRACTICES: 'Development Patterns',
    UI_DESIGN: 'Styling & Design',
    STYLING_GUIDELINES: 'Styling & Design',
    TECH_STACK: 'Technical Implementation',
    ROUTING: 'Technical Implementation',
    STATE_MANAGEMENT: 'Technical Implementation',
    TESTING: 'Technical Implementation',
    DEPLOYMENT: 'Technical Implementation',
    CURSOR_BEST_PRACTICES: 'Development Tools',
  }

  const baseName = filename.replace('.md', '').toUpperCase()
  return categories[baseName] || 'General'
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse<ApiResponse>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    })
  }

  // Verify API key
  const apiKey = (req.query.key as string) || req.headers['x-api-key']
  const expectedKey = process.env.DOCS_API_KEY

  if (!expectedKey) {
    return res.status(500).json({
      success: false,
      error: 'API key not configured',
    })
  }

  if (!apiKey || apiKey !== expectedKey) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized - Invalid API key',
    })
  }

  try {
    // Read docs_unified directory
    const docsPath = path.join(process.cwd(), 'docs_unified')

    if (!fs.existsSync(docsPath)) {
      return res.status(404).json({
        success: false,
        error: 'Documentation directory not found',
      })
    }

    // Read all markdown files
    const files = fs.readdirSync(docsPath).filter((file) => file.endsWith('.md'))
    const documentationFiles: DocumentationFile[] = []

    for (const file of files) {
      const filePath = path.join(docsPath, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const title = extractTitle(content)
      const description = extractDescription(content)
      const category = categorizeFile(file)

      documentationFiles.push({
        name: file,
        title,
        description,
        category,
      })
    }

    // Sort by category, then by name
    documentationFiles.sort((a, b) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category)
      }
      return a.name.localeCompare(b.name)
    })

    return res.status(200).json({
      success: true,
      data: {
        files: documentationFiles,
      },
    })
  } catch (error) {
    console.error('Error reading directory:', error)
    return res.status(500).json({
      success: false,
      error: 'Error reading documentation directory',
    })
  }
}

