# PalomaPOS Dashboard

## Overview

PalomaPOS Dashboard is a modern web application built with React, Vite, TypeScript, and Tailwind CSS. The application follows a component-based architecture with reusable UI components, dark mode support, and responsive design patterns.

## Documentation Structure

This project uses a two-folder documentation structure:

- **`docs_unified/`** - Universal documentation patterns reusable across all React + Vite + TypeScript projects
- **`docs_project/`** - Project-specific documentation describing this project's logic, architecture, and implementation

### Unified Documentation API

The unified documentation is available via API for use in other projects with Cursor AI:

- **API Base URL**: `https://your-domain.com/api/docs`
- **API Key**: See `API_KEY.txt` or `DOCS_INTEGRATION_GUIDE.md`
- **Integration Guide**: See [DOCS_INTEGRATION_GUIDE.md](DOCS_INTEGRATION_GUIDE.md) for complete setup instructions

**API Endpoints**:
- `GET /api/docs/:filename?key=API_KEY` - Get specific documentation file
- `GET /api/docs?key=API_KEY` - List all available documentation files
- `GET /api/docs/all?key=API_KEY` - Get all documentation (bulk)

This allows other projects to reference and follow the same unified development patterns using Cursor AI.

### Unified Documentation (`docs_unified/`)

Universal patterns and guidelines that can be reused in any React + Vite + TypeScript project:

- **[Frontend Development](docs_unified/FRONTEND_DEVELOPMENT.md)** - Component architecture, reusable components, and development patterns
- **[UI Design](docs_unified/UI_DESIGN.md)** - UI themes, color specifications, and design requirements
- **[Best Practices](docs_unified/BEST_PRACTICES.md)** - Development best practices, code quality, and patterns
- **[Cursor Best Practices](docs_unified/CURSOR_BEST_PRACTICES.md)** - Guidelines for working with Cursor AI
- **[Styling Guidelines](docs_unified/STYLING_GUIDELINES.md)** - CSS/Tailwind rules, dark mode requirements
- **[Tech Stack](docs_unified/TECH_STACK.md)** - Technology stack details and configuration
- **[Routing](docs_unified/ROUTING.md)** - Routing structure and navigation patterns
- **[State Management](docs_unified/STATE_MANAGEMENT.md)** - State management approach and patterns
- **[Testing](docs_unified/TESTING.md)** - Testing strategies and guidelines
- **[Deployment](docs_unified/DEPLOYMENT.md)** - Deployment process and configuration
- **[Project Structure](docs_unified/PROJECT_STRUCTURE.md)** - Folder structure, file organization, and naming conventions

### Project Documentation (`docs_project/`)

Project-specific documentation for PalomaPOS Dashboard:

- **[Project Overview](docs_project/README.md)** - Project overview and quick start
- **[Architecture](docs_project/ARCHITECTURE.md)** - This project's specific system architecture
- **[Project Approach](docs_project/PROJECT_APPROACH.md)** - Development approach, design decisions, and project logic
- **[Project Logic](docs_project/PROJECT_LOGIC.md)** - Detailed description of project logic, business rules, and decisions
- **[Implementation](docs_project/IMPLEMENTATION.md)** - Project-specific implementation details and configurations

## Tech Stack

- **React 18+** - UI library
- **Vite** - Build tool and development server
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

## Quick Start

### Prerequisites

- Node.js 20+ (LTS) and npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server (frontend only - API routes won't work)
npm run dev

# Start development server with API routes (requires Vercel CLI)
# First install: npm install -g vercel
npm run dev:api
# or
npm run dev:full

# Build for production
npm run build

# Preview production build
npm run preview
```

**Important:** 
- `npm run dev` - Frontend only, API routes will return an error message
- `npm run dev:api` - Full development with API routes (requires `vercel dev`)
- For local API testing, use `vercel dev` which properly handles serverless functions

## Key Features

- **Component-Based Architecture** - Reusable components for consistency and maintainability
- **Dark Mode Support** - Dark theme as default with light theme option
- **TypeScript** - Full type safety throughout the application
- **Responsive Design** - Mobile and desktop support
- **Modern Tooling** - Vite for fast development and optimized builds
- **Latest Stable Packages** - Always use latest stable versions of all dependencies

## Development Guidelines

### Documentation-First Approach

**IMPORTANT**: Always update documentation BEFORE writing code. This ensures clear requirements and maintains documentation as the single source of truth.

### Using Unified Documentation

This project follows patterns from `docs_unified/`. When developing:

1. **Reference Unified Patterns** - Use patterns from `docs_unified/` as the foundation
2. **Extend with Project Logic** - Add project-specific details in `docs_project/`
3. **Document Decisions** - Explain why this project makes specific choices

### Package Management

**CRITICAL**: Always use **latest stable versions** of all packages. Never use outdated, deprecated, or old packages. See [Tech Stack](docs_unified/TECH_STACK.md) and [Best Practices](docs_unified/BEST_PRACTICES.md) for package version guidelines.

### Component Development

- Use reusable components from `components/common/` instead of inline styles
- All components must support dark mode
- Follow the patterns documented in [Frontend Development](docs_unified/FRONTEND_DEVELOPMENT.md)

### Styling

- Use Tailwind CSS for all styling
- All text must include dark mode variants: `text-gray-900 dark:text-white`
- All containers must include dark backgrounds: `bg-white dark:bg-dark-bg-secondary`
- Never use inline className patterns for form fields

## Getting Started

1. Read the [Project Overview](docs_project/README.md) for project-specific information
2. Review [Architecture](docs_project/ARCHITECTURE.md) to understand this project's system design
3. Check [Project Approach](docs_project/PROJECT_APPROACH.md) to understand the development philosophy
4. Reference [Unified Documentation](docs_unified/README.md) for universal patterns
5. Follow [Best Practices](docs_unified/BEST_PRACTICES.md) for code quality

## Project Structure

```
PalomaPOS_Dashboard/
├── docs_unified/          # Universal patterns (reusable)
├── docs_project/          # Project-specific documentation
├── frontend/              # Frontend application
│   └── src/
│       ├── components/    # React components
│       ├── pages/         # Page components
│       ├── hooks/         # Custom React hooks
│       ├── utils/         # Utility functions
│       ├── types/         # TypeScript type definitions
│       └── routes/        # Route configuration
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Contributing

When adding new features or making changes:

1. **Update documentation FIRST** - Document requirements, structure, and behavior
2. **Then implement code** - Follow documented patterns and requirements
3. **Verify consistency** - Ensure code matches documentation

For detailed workflow instructions, see [Cursor Best Practices](docs_unified/CURSOR_BEST_PRACTICES.md).

## Unified Documentation Maintenance

### ⚠️ MANDATORY Rule: API Key Regeneration

**When modifying any file in `docs_unified/`:**

1. **Regenerate API Key** - Generate a new static API key:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Update API Endpoint Files** - Update the hardcoded API key in all three API endpoint files:
   - `api/docs/[filename].ts`
   - `api/docs/index.ts`
   - `api/docs/all.ts`
   (Change the `DOCS_API_KEY` constant in each file)

3. **Update Documentation** - Update `API_KEY.txt` and `DOCS_INTEGRATION_GUIDE.md` with the new key

4. **Notify All Projects** - Share the new API key with all projects using the unified documentation

5. **Update `.cursorrules`** - Update this project's `.cursorrules` if it references the API key

**Why This Rule Exists:**
- Ensures all projects use the latest documentation version
- Prevents access to outdated patterns
- Maintains consistency across all projects
- Forces explicit acknowledgment of documentation changes

