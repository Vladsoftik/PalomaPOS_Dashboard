import type { VercelRequest, VercelResponse } from '@vercel/node'
import fs from 'fs'
import path from 'path'

interface DocumentationContent {
  content: string
  title: string
  sections: string[]
}

interface ApiResponse {
  success: boolean
  data?: {
    documentation: Record<string, DocumentationContent>
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

// Extract section headings from markdown
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
    const documentation: Record<string, DocumentationContent> = {}

    for (const file of files) {
      const filePath = path.join(docsPath, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const title = extractTitle(content)
      const sections = extractSections(content)

      documentation[file] = {
        content,
        title,
        sections,
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        documentation,
      },
    })
  } catch (error) {
    console.error('Error reading documentation:', error)
    return res.status(500).json({
      success: false,
      error: 'Error reading documentation files',
    })
  }
}

