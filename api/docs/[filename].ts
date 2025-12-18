import type { VercelRequest, VercelResponse } from '@vercel/node'
import fs from 'fs'
import path from 'path'

interface ApiResponse {
  success: boolean
  data?: {
    filename: string
    content: string
    title: string
    sections: string[]
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

  // Get filename from route parameter
  const filename = req.query.filename as string

  if (!filename) {
    return res.status(400).json({
      success: false,
      error: 'Filename is required',
    })
  }

  // Sanitize filename to prevent directory traversal
  const sanitizedFilename = path.basename(filename)
  if (!sanitizedFilename || sanitizedFilename !== filename) {
    return res.status(400).json({
      success: false,
      error: 'Invalid filename',
    })
  }

  // Construct file path
  const docsPath = path.join(process.cwd(), 'docs_unified', sanitizedFilename)

  // Check if file exists
  if (!fs.existsSync(docsPath)) {
    return res.status(404).json({
      success: false,
      error: 'Documentation file not found',
    })
  }

  try {
    // Read file content
    const content = fs.readFileSync(docsPath, 'utf-8')
    const title = extractTitle(content)
    const sections = extractSections(content)

    // Return file content with metadata
    return res.status(200).json({
      success: true,
      data: {
        filename: sanitizedFilename,
        content,
        title,
        sections,
      },
    })
  } catch (error) {
    console.error('Error reading file:', error)
    return res.status(500).json({
      success: false,
      error: 'Error reading documentation file',
    })
  }
}

