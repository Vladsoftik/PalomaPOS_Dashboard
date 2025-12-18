# Technology Stack

## Overview

This document details the universal technology stack, dependencies, and configuration requirements for React + Vite + TypeScript projects.

## Core Technologies

### React 18+

**Version**: 18.0.0 or higher

**Purpose**: UI library for building user interfaces

**Key Features**:
- Functional components with hooks
- Server components (if using React 18+ features)
- Concurrent rendering
- Automatic batching

**Documentation**: https://react.dev

### Vite

**Version**: 5.0.0 or higher

**Purpose**: Build tool and development server

**Key Features**:
- Fast HMR (Hot Module Replacement)
- Optimized production builds
- Native ES modules
- Plugin ecosystem

**Documentation**: https://vitejs.dev

### TypeScript

**Version**: 5.0.0 or higher

**Purpose**: Type-safe JavaScript

**Key Features**:
- Static type checking
- Enhanced IDE support
- Better code documentation
- Compile-time error detection

**Documentation**: https://www.typescriptlang.org

### Tailwind CSS

**Version**: 3.4.0 or higher

**Purpose**: Utility-first CSS framework

**Key Features**:
- Utility classes
- Dark mode support
- Responsive design
- Custom configuration

**Documentation**: https://tailwindcss.com

### React Router

**Version**: 6.20.0 or higher

**Purpose**: Client-side routing

**Key Features**:
- Declarative routing
- Nested routes
- Code splitting
- Navigation guards

**Documentation**: https://reactrouter.com

## Development Dependencies

### ESLint

**Purpose**: Code linting and quality checks

**Configuration**: `.eslintrc.js` or `eslint.config.js`

### TypeScript Compiler

**Purpose**: Type checking and compilation

**Configuration**: `tsconfig.json`

### PostCSS

**Purpose**: CSS processing for Tailwind

**Configuration**: `postcss.config.js`

### Autoprefixer

**Purpose**: Automatic vendor prefixes

**Configuration**: Included in `postcss.config.js`

## Optional Dependencies

### React Hook Form

**Purpose**: Form state management and validation

**Usage**: For complex forms with validation

**Documentation**: https://react-hook-form.com

### Lucide React

**Purpose**: Icon library

**Usage**: For consistent iconography

**Documentation**: https://lucide.dev

## Configuration Files

### package.json

**Purpose**: Project dependencies and scripts

**Key Scripts**:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  }
}
```

### tsconfig.json

**Purpose**: TypeScript configuration

**Key Settings**:
- Strict mode enabled
- Path aliases (if configured)
- React JSX support
- ES2020 target

**Example**:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### vite.config.ts

**Purpose**: Vite build configuration

**Key Settings**:
- React plugin
- Path resolution
- Environment variables
- Build optimization

**Example**:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
```

### tailwind.config.js

**Purpose**: Tailwind CSS configuration

**Key Settings**:
- Dark mode: `class`
- Custom colors
- Custom theme extensions

**Example**:
```javascript
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#061222',
          'bg-secondary': '#0a1a2e',
        },
        logo: {
          blue: '#34b7ff',
          white: '#ffffff',
        },
      },
    },
  },
  plugins: [],
}
```

### postcss.config.js

**Purpose**: PostCSS configuration for Tailwind

**Example**:
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## Package Version Policy

### ⚠️ CRITICAL: Use Only Latest Stable Packages

**MANDATORY RULE**: Always use the **latest stable versions** of all packages. Never use outdated or deprecated packages.

### Version Selection Guidelines

1. **Always Use Latest Stable**
   - Check package registry (npm) for latest stable version
   - Use `npm view <package> version` to check latest version
   - Avoid beta, alpha, or release candidate versions unless necessary
   - Prefer LTS (Long Term Support) versions when available

2. **Version Range Strategy**
   - Use `^` (caret) for minor updates: `^5.0.0` allows `5.x.x` but not `6.0.0`
   - Use `~` (tilde) for patch updates: `~5.0.0` allows `5.0.x` but not `5.1.0`
   - Avoid exact versions (`5.0.0`) unless absolutely necessary
   - Avoid `*` or `latest` in package.json (use specific versions)

3. **Regular Updates**
   - Regularly update dependencies to latest stable versions
   - Use `npm outdated` to check for outdated packages
   - Update packages incrementally and test after each update
   - Review changelogs for breaking changes

4. **Security Updates**
   - Prioritize security updates immediately
   - Use `npm audit` to check for vulnerabilities
   - Fix security issues by updating to latest stable versions

### Checking Latest Versions

```bash
# Check latest version of a package
npm view react version
npm view vite version
npm view typescript version

# Check all outdated packages
npm outdated

# Update to latest stable versions
npm update

# Check for security vulnerabilities
npm audit
```

### Package Installation Best Practices

```bash
# ✅ Good: Install latest stable version
npm install react@latest
npm install vite@latest

# ✅ Good: Install with version range (allows minor updates)
npm install react@^18.3.0
npm install vite@^5.0.0

# ❌ Bad: Install old versions
npm install react@17.0.0
npm install vite@4.0.0

# ❌ Bad: Use exact versions without good reason
npm install react@18.2.0
```

### Deprecated Packages

**NEVER use deprecated packages**. If a package is deprecated:

1. Check for recommended alternatives
2. Migrate to the recommended replacement
3. Update documentation accordingly
4. Remove deprecated packages from dependencies

### Package Compatibility

When updating packages:

1. **Check Compatibility**
   - Verify package compatibility with other dependencies
   - Check peer dependency requirements
   - Review breaking changes in changelogs

2. **Test After Updates**
   - Run tests after updating packages
   - Verify application functionality
   - Check for deprecation warnings

3. **Incremental Updates**
   - Update one package at a time when possible
   - Test after each update
   - Commit updates incrementally

## Version Requirements

### Node.js

**Minimum**: 20.0.0 (LTS)

**Recommended**: Latest LTS version

**Check Latest**: `node --version` or visit https://nodejs.org

### Package Managers

Use latest stable versions:

- **npm**: Latest stable (check with `npm --version`)
- **yarn**: Latest stable (check with `yarn --version`)
- **pnpm**: Latest stable (check with `pnpm --version`)

### Core Dependencies

Always use latest stable versions:

- **React**: Latest stable (currently 18.x)
- **Vite**: Latest stable (currently 5.x)
- **TypeScript**: Latest stable (currently 5.x)
- **Tailwind CSS**: Latest stable (currently 3.x)
- **React Router**: Latest stable (currently 6.x)

**Check Latest Versions**:
```bash
npm view react version
npm view vite version
npm view typescript version
npm view tailwindcss version
npm view react-router-dom version
```

## Browser Support

### Supported Browsers

- Chrome: Current and recent versions
- Firefox: Current and recent versions
- Safari: Current and recent versions
- Edge: Current and recent versions

### Polyfills

Vite handles most polyfills automatically. Additional polyfills may be needed for:
- Older browser support (if required)
- Specific features not supported by target browsers

## Development Tools

### Recommended IDE

- **VS Code** with extensions:
  - ESLint
  - Prettier (if using)
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

### Recommended Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (if applicable)

## Build and Deployment

### Development Build

```bash
npm run dev
```

- Fast HMR
- Source maps
- Development optimizations

### Production Build

```bash
npm run build
```

- Optimized bundle
- Minified code
- Tree shaking
- Code splitting

### Preview Production Build

```bash
npm run preview
```

- Test production build locally
- Verify optimizations

## Environment Variables

### .env.example

Template for environment variables:

```env
# Example environment variables
VITE_APP_TITLE=Application Name
VITE_API_URL=https://api.example.com
```

### Usage

Access environment variables in code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

**Note**: Variables must be prefixed with `VITE_` to be exposed to client code.

## Package Update Workflow

### Regular Maintenance

1. **Weekly Checks**
   ```bash
   npm outdated
   npm audit
   ```

2. **Monthly Updates**
   - Review and update dependencies
   - Test after updates
   - Update documentation if needed

3. **Security Updates**
   - Address immediately
   - Test thoroughly
   - Deploy security patches promptly

### Update Process

```bash
# 1. Check current versions
npm list --depth=0

# 2. Check for outdated packages
npm outdated

# 3. Check for security issues
npm audit

# 4. Update packages (one at a time recommended)
npm install <package>@latest

# 5. Test application
npm run test
npm run build

# 6. Commit changes
git add package.json package-lock.json
git commit -m "chore: update <package> to latest stable version"
```

## Summary

The technology stack provides:

- **Modern Tooling** - Latest stable versions of React, Vite, TypeScript
- **Fast Development** - Vite HMR for quick iteration
- **Type Safety** - Full TypeScript coverage
- **Styling** - Tailwind CSS for utility-first styling
- **Routing** - React Router for client-side navigation
- **Quality** - ESLint for code quality
- **Performance** - Optimized production builds
- **Security** - Regular updates to latest stable versions
- **Maintainability** - Up-to-date dependencies and best practices

