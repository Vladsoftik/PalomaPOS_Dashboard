# Unified Documentation Integration Guide

## Overview

This guide explains how to integrate the unified development documentation into your project so that Cursor AI can reference and follow the same development patterns across all projects.

## What is Unified Documentation?

The unified documentation (`docs_unified/`) contains universal development patterns, best practices, and guidelines for React + Vite + TypeScript projects. These patterns ensure consistency across all projects and provide a standardized approach to development.

## Quick Start

### 1. Get API Access

**API URL**: `https://your-domain.com/api/docs`  
**API Key**: `a02cb62a06c3df3dc7635bbdc2e79d5e9c325bfdbe0f24a6616bcd8ee8c6ede2`

> **Note**: Replace `your-domain.com` with your actual deployment domain.

### 2. Configure Cursor AI

Add the following to your project's `.cursorrules` file:

```markdown
# Unified Development Documentation

This project follows the unified development approach documented at:
DOCS_API_URL=https://your-domain.com/api/docs
DOCS_API_KEY=a02cb62a06c3df3dc7635bbdc2e79d5e9c325bfdbe0f24a6616bcd8ee8c6ede2

## Documentation Reference

When developing, always reference the unified documentation:

### Development Patterns
- **Frontend Development**: ${DOCS_API_URL}/FRONTEND_DEVELOPMENT.md?key=${DOCS_API_KEY}
- **Project Structure**: ${DOCS_API_URL}/PROJECT_STRUCTURE.md?key=${DOCS_API_KEY}
- **Best Practices**: ${DOCS_API_URL}/BEST_PRACTICES.md?key=${DOCS_API_KEY}

### Styling & Design
- **UI Design**: ${DOCS_API_URL}/UI_DESIGN.md?key=${DOCS_API_KEY}
- **Styling Guidelines**: ${DOCS_API_URL}/STYLING_GUIDELINES.md?key=${DOCS_API_KEY}

### Technical Implementation
- **Tech Stack**: ${DOCS_API_URL}/TECH_STACK.md?key=${DOCS_API_KEY}
- **Routing**: ${DOCS_API_URL}/ROUTING.md?key=${DOCS_API_KEY}
- **State Management**: ${DOCS_API_URL}/STATE_MANAGEMENT.md?key=${DOCS_API_KEY}
- **Testing**: ${DOCS_API_URL}/TESTING.md?key=${DOCS_API_KEY}
- **Deployment**: ${DOCS_API_URL}/DEPLOYMENT.md?key=${DOCS_API_KEY}

### Development Tools
- **Cursor Best Practices**: ${DOCS_API_URL}/CURSOR_BEST_PRACTICES.md?key=${DOCS_API_KEY}

## Rules

1. **Always Follow Unified Patterns**: Reference unified documentation before implementing features
2. **Component Architecture**: Use patterns from FRONTEND_DEVELOPMENT.md
3. **Styling**: Follow STYLING_GUIDELINES.md for all styling decisions
4. **Project Structure**: Follow PROJECT_STRUCTURE.md for file organization
5. **Best Practices**: Apply BEST_PRACTICES.md in all development work
6. **Tech Stack**: Use TECH_STACK.md for dependency and configuration decisions
7. **Documentation First**: Update documentation before writing code (see CURSOR_BEST_PRACTICES.md)
```

## API Endpoints

### 1. Get Specific Documentation File

```bash
GET /api/docs/:filename?key=API_KEY
```

**Example**:
```bash
curl "https://your-domain.com/api/docs/FRONTEND_DEVELOPMENT.md?key=YOUR_API_KEY"
```

**Response**:
```json
{
  "success": true,
  "data": {
    "filename": "FRONTEND_DEVELOPMENT.md",
    "content": "# Frontend Development Guide\n\n...",
    "title": "Frontend Development Guide",
    "sections": ["Component Architecture", "Reusable Components", ...]
  }
}
```

### 2. List All Documentation Files

```bash
GET /api/docs?key=API_KEY
```

**Example**:
```bash
curl "https://your-domain.com/api/docs?key=YOUR_API_KEY"
```

**Response**:
```json
{
  "success": true,
  "data": {
    "files": [
      {
        "name": "FRONTEND_DEVELOPMENT.md",
        "title": "Frontend Development Guide",
        "description": "Component architecture, reusable components...",
        "category": "Development Patterns"
      },
      ...
    ]
  }
}
```

### 3. Get All Documentation (Bulk)

```bash
GET /api/docs/all?key=API_KEY
```

**Example**:
```bash
curl "https://your-domain.com/api/docs/all?key=YOUR_API_KEY"
```

**Response**:
```json
{
  "success": true,
  "data": {
    "documentation": {
      "FRONTEND_DEVELOPMENT.md": {
        "content": "...",
        "title": "Frontend Development Guide",
        "sections": [...]
      },
      ...
    }
  }
}
```

## Authentication

All API endpoints require authentication using the static API key. You can provide the key in two ways:

1. **Query Parameter**: `?key=YOUR_API_KEY`
2. **Header**: `X-API-Key: YOUR_API_KEY`

## Using Documentation in Development

### With Cursor AI

When working with Cursor AI, the documentation will be automatically referenced based on your `.cursorrules` configuration. Cursor will:

1. Reference appropriate documentation files when implementing features
2. Follow patterns from the unified documentation
3. Ensure consistency with other projects
4. Apply best practices automatically

### Manual Reference

You can also manually reference documentation in your code comments or documentation:

```typescript
// Following patterns from FRONTEND_DEVELOPMENT.md
// See: https://your-domain.com/api/docs/FRONTEND_DEVELOPMENT.md?key=YOUR_API_KEY
```

## Documentation Categories

### Development Patterns
- `FRONTEND_DEVELOPMENT.md` - Component architecture and development patterns
- `PROJECT_STRUCTURE.md` - Folder structure and file organization
- `BEST_PRACTICES.md` - Development best practices

### Styling & Design
- `UI_DESIGN.md` - UI themes and design requirements
- `STYLING_GUIDELINES.md` - CSS/Tailwind rules and styling patterns

### Technical Implementation
- `TECH_STACK.md` - Technology stack and dependencies
- `ROUTING.md` - Routing structure and patterns
- `STATE_MANAGEMENT.md` - State management approaches
- `TESTING.md` - Testing strategies
- `DEPLOYMENT.md` - Deployment process

### Development Tools
- `CURSOR_BEST_PRACTICES.md` - Guidelines for working with Cursor AI

## Best Practices

### 1. Always Reference Documentation

Before implementing a new feature:
1. Check relevant unified documentation
2. Follow established patterns
3. Ensure consistency with other projects

### 2. Update Documentation

If you find improvements to patterns:
1. Update the unified documentation (in main project)
2. **MANDATORY: Regenerate API Key** - When any file in `docs_unified/` is modified, the API key MUST be regenerated
3. Update the API key in Vercel environment variables
4. Share the new API key with all projects using the documentation
5. All projects will benefit from updates
6. Maintain consistency across projects

**⚠️ IMPORTANT**: API key regeneration ensures all projects are using the latest documentation version and prevents access to outdated patterns.

### 3. Use Cursor AI Effectively

- Configure `.cursorrules` properly
- Reference documentation in prompts
- Let Cursor follow unified patterns automatically

## Troubleshooting

### API Key Issues

**Error**: `401 Unauthorized - Invalid API key`

**Solution**: 
- Verify API key is correct
- Ensure key is included in API requests (query parameter or header)
- Check that the API key matches the hardcoded key in the API endpoint files

### File Not Found

**Error**: `404 Documentation file not found`

**Solution**:
- Verify filename is correct (case-sensitive)
- Check that file exists in `docs_unified/` directory
- Use `/api/docs` endpoint to list all available files

### Cursor Not Referencing Documentation

**Solution**:
- Verify `.cursorrules` is properly configured
- Check that API URL and key are correct
- Ensure Cursor has access to the API endpoint
- Try referencing documentation explicitly in prompts

## Security Notes

- API key provides **read-only** access to documentation
- No sensitive data is exposed in documentation
- Key can be shared with development teams
- Key can be rotated via Vercel environment variables if needed

## Support

For issues or questions:
1. Check this integration guide
2. Review unified documentation files
3. Contact the main project maintainers

## Example: Complete .cursorrules Configuration

```markdown
# Cursor AI Rules for [Your Project Name]

## Unified Development Documentation

This project follows the unified development approach.

DOCS_API_URL=https://your-domain.com/api/docs
DOCS_API_KEY=a02cb62a06c3df3dc7635bbdc2e79d5e9c325bfdbe0f24a6616bcd8ee8c6ede2

## Documentation Reference

When developing, always reference the unified documentation:
- Frontend Development: ${DOCS_API_URL}/FRONTEND_DEVELOPMENT.md?key=${DOCS_API_KEY}
- Styling Guidelines: ${DOCS_API_URL}/STYLING_GUIDELINES.md?key=${DOCS_API_KEY}
- Best Practices: ${DOCS_API_URL}/BEST_PRACTICES.md?key=${DOCS_API_KEY}
- Project Structure: ${DOCS_API_URL}/PROJECT_STRUCTURE.md?key=${DOCS_API_KEY}
- Tech Stack: ${DOCS_API_URL}/TECH_STACK.md?key=${DOCS_API_KEY}

## Development Rules

1. **Always Follow Unified Patterns**: Reference unified documentation before implementing features
2. **Component Architecture**: Use patterns from FRONTEND_DEVELOPMENT.md
3. **Styling**: Follow STYLING_GUIDELINES.md for all styling decisions
4. **Project Structure**: Follow PROJECT_STRUCTURE.md for file organization
5. **Best Practices**: Apply BEST_PRACTICES.md in all development work
6. **Documentation First**: Update documentation before writing code
7. **Latest Packages**: Always use latest stable versions (see TECH_STACK.md)
```

---

**Last Updated**: Generated automatically  
**API Version**: 1.0  
**Documentation Version**: Latest from `docs_unified/`

