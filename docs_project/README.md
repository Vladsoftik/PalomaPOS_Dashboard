# PalomaPOS Dashboard - Project Documentation

## Overview

PalomaPOS Dashboard is a modern web application built with React, Vite, TypeScript, and Tailwind CSS. The application follows a component-based architecture with reusable UI components, dark mode support, and responsive design patterns.

This folder contains **project-specific documentation** that describes this project's logic, architecture, and implementation details.

## Documentation Structure

This project uses a two-folder documentation structure:

- **`docs_unified/`** - Universal patterns reusable across all projects
- **`docs_project/`** - Project-specific documentation (this folder)

## Project Documentation

### Core Documentation

- **[Architecture](ARCHITECTURE.md)** - This project's specific system architecture and design decisions
- **[Project Approach](PROJECT_APPROACH.md)** - Development approach, design decisions, and project logic
- **[Project Logic](PROJECT_LOGIC.md)** - Detailed description of project logic, business rules, and decisions
- **[Implementation](IMPLEMENTATION.md)** - Project-specific implementation details and configurations

## Quick Start

### Prerequisites

- Node.js 20+ (LTS) and npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **React 18+** - UI library
- **Vite** - Build tool and development server
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

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

**CRITICAL**: Always use **latest stable versions** of all packages. Never use outdated, deprecated, or old packages. See [Tech Stack](../docs_unified/TECH_STACK.md) and [Best Practices](../docs_unified/BEST_PRACTICES.md) for package version guidelines.

### Component Development

- Use reusable components from `components/common/` instead of inline styles
- All components must support dark mode
- Follow the patterns documented in [Frontend Development](../docs_unified/FRONTEND_DEVELOPMENT.md)

### Styling

- Use Tailwind CSS for all styling
- All text must include dark mode variants: `text-gray-900 dark:text-white`
- All containers must include dark backgrounds: `bg-white dark:bg-dark-bg-secondary`
- Never use inline className patterns for form fields

## Getting Started

1. Read the [Architecture](ARCHITECTURE.md) documentation to understand this project's system design
2. Review [Project Approach](PROJECT_APPROACH.md) to understand the development philosophy
3. Check [Project Logic](PROJECT_LOGIC.md) for detailed project logic and decisions
4. Reference [Unified Documentation](../docs_unified/README.md) for universal patterns
5. Follow [Best Practices](../docs_unified/BEST_PRACTICES.md) for code quality

## Project Structure

```
PalomaPOS_Dashboard/
├── docs_unified/          # Universal patterns (reusable)
├── docs_project/          # Project-specific documentation (this folder)
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

For detailed workflow instructions, see [Cursor Best Practices](../docs_unified/CURSOR_BEST_PRACTICES.md).

