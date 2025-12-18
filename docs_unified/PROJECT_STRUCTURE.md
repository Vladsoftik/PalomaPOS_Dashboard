# Project Structure

## Overview

This document outlines universal folder structure, file organization, and naming conventions for React + Vite + TypeScript projects.

## Root Structure

```
ProjectName/
├── docs_unified/            # Universal documentation (reusable)
├── docs_project/            # Project-specific documentation
├── frontend/                # Frontend application
│   └── src/                 # Source code
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── .gitignore              # Git ignore patterns
├── .env.example            # Environment variables template
└── README.md               # Project overview
```

## Frontend Structure

```
frontend/src/
├── components/             # React components
│   ├── common/             # Reusable UI components
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Select.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   ├── Label.tsx
│   │   ├── FormField.tsx
│   │   ├── Heading.tsx
│   │   ├── Text.tsx
│   │   ├── Toast.tsx
│   │   └── index.ts        # Barrel exports
│   ├── features/           # Feature-specific components
│   │   ├── Dashboard/
│   │   ├── Settings/
│   │   └── ...
│   └── layout/             # Layout components
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── Layout.tsx
├── pages/                  # Page components
│   ├── Dashboard.tsx
│   ├── Settings.tsx
│   └── ...
├── hooks/                  # Custom React hooks
│   ├── useTheme.ts
│   └── ...
├── utils/                  # Utility functions
│   ├── theme.ts
│   └── ...
├── types/                  # TypeScript type definitions
│   ├── index.ts
│   └── ...
├── routes/                 # Route configuration
│   └── index.tsx
├── App.tsx                 # Main app component
├── main.tsx                # Application entry point
└── index.css               # Global styles
```

## Folder Descriptions

### `components/common/`

Reusable UI components used throughout the application.

**Purpose**: Shared components that provide consistent styling and behavior.

**Naming**: PascalCase (`Input.tsx`, `Button.tsx`)

**Exports**: Barrel export via `index.ts`

**Examples**:
- `Input.tsx` - Form input component
- `Button.tsx` - Button component
- `Modal.tsx` - Modal dialog component

### `components/features/`

Feature-specific components organized by feature domain.

**Purpose**: Components specific to a particular feature or domain.

**Naming**: PascalCase, organized in folders by feature

**Structure**:
```
components/features/
├── Dashboard/
│   ├── DashboardCard.tsx
│   └── ...
├── Settings/
│   ├── SettingsForm.tsx
│   └── ...
```

### `components/layout/`

Layout and navigation components.

**Purpose**: Components that define the overall page structure.

**Examples**:
- `Header.tsx` - Top navigation header
- `Sidebar.tsx` - Side navigation
- `Layout.tsx` - Main layout wrapper

### `pages/`

Top-level page components for routes.

**Purpose**: Components that represent full pages/routes.

**Naming**: PascalCase matching route name

**Examples**:
- `Dashboard.tsx` - Dashboard page
- `Settings.tsx` - Settings page

### `hooks/`

Custom React hooks for reusable stateful logic.

**Purpose**: Extract and reuse stateful logic across components.

**Naming**: camelCase with `use` prefix (`useTheme.ts`)

**Examples**:
- `useTheme.ts` - Theme management hook
- `useAuth.ts` - Authentication hook (if applicable)

### `utils/`

Pure utility functions.

**Purpose**: Helper functions that don't depend on React.

**Naming**: camelCase (`formatDate.ts`, `theme.ts`)

**Examples**:
- `theme.ts` - Theme utility functions
- `formatDate.ts` - Date formatting utilities

### `types/`

TypeScript type definitions.

**Purpose**: Shared type definitions used across the application.

**Naming**: camelCase with `.types.ts` suffix or `index.ts`

**Examples**:
- `index.ts` - Main type exports
- `user.types.ts` - User-related types

### `routes/`

Route configuration and navigation setup.

**Purpose**: Define application routes and navigation structure.

**Examples**:
- `index.tsx` - Main route configuration

## File Naming Conventions

### Components

- **Component Files**: PascalCase (`UserForm.tsx`, `DashboardCard.tsx`)
- **Component Names**: Match file name (`export default function UserForm`)
- **Props Interfaces**: Component name + Props (`UserFormProps`)

### Utilities

- **Utility Files**: camelCase (`formatDate.ts`, `theme.ts`)
- **Function Names**: camelCase (`formatDate`, `getTheme`)

### Hooks

- **Hook Files**: camelCase with `use` prefix (`useTheme.ts`, `useAuth.ts`)
- **Hook Names**: camelCase with `use` prefix (`useTheme`, `useAuth`)

### Types

- **Type Files**: camelCase with `.types.ts` suffix (`user.types.ts`)
- **Type Names**: PascalCase (`User`, `FormData`)

### Constants

- **Constant Files**: camelCase (`constants.ts`)
- **Constant Names**: UPPER_SNAKE_CASE (`MAX_RETRIES`, `API_BASE_URL`)

## Import Patterns

### Barrel Exports

Use barrel exports (`index.ts`) for clean imports:

```tsx
// components/common/index.ts
export { default as Input } from './Input'
export { default as Button } from './Button'
export { default as Modal } from './Modal'

// Usage
import { Input, Button, Modal } from '../../common'
```

### Relative Imports

Use relative imports for local files:

```tsx
// From component to component in same folder
import UserCard from './UserCard'

// From feature component to common component
import { Input, Button } from '../../common'

// From page to component
import { Input } from '../components/common'
```

### Path Aliases (if configured)

If path aliases are configured in `tsconfig.json`:

```tsx
// Instead of
import { Input } from '../../components/common'

// Use
import { Input } from '@/components/common'
```

## File Organization Rules

### 1. One Component Per File

Each component should be in its own file:

```
✅ Good:
components/common/Input.tsx
components/common/Button.tsx

❌ Bad:
components/common/FormComponents.tsx (multiple components)
```

### 2. Related Files Together

Group related files in the same folder:

```
✅ Good:
components/features/Dashboard/
  ├── DashboardCard.tsx
  ├── DashboardStats.tsx
  └── DashboardChart.tsx
```

### 3. Index Files for Exports

Use `index.ts` for barrel exports:

```
components/common/
  ├── Input.tsx
  ├── Button.tsx
  └── index.ts  # Exports all components
```

### 4. Separate Types

Keep type definitions in `types/` folder or co-located:

```
✅ Good:
types/user.types.ts
// OR
components/User/User.types.ts
```

## Component Organization

### Common Components

All reusable UI components go in `components/common/`:

- Form components (Input, Select, Textarea, Checkbox)
- UI components (Button, Modal, Toast)
- Typography (Heading, Text, Label)
- Layout helpers (FormField)

### Feature Components

Feature-specific components go in `components/features/[FeatureName]/`:

- Components used only within a specific feature
- May use common components
- Organized by feature domain

### Layout Components

Layout components go in `components/layout/`:

- Header, Sidebar, Layout wrapper
- Navigation components
- Page structure components

## Best Practices

### 1. Consistent Naming

- Use consistent naming conventions throughout
- Follow established patterns
- Make names descriptive and clear

### 2. Logical Grouping

- Group related files together
- Use feature-based organization for large features
- Keep common components separate

### 3. Clear Structure

- Maintain clear folder hierarchy
- Avoid deep nesting (max 3-4 levels)
- Use descriptive folder names

### 4. Barrel Exports

- Use barrel exports for clean imports
- Export from `index.ts` files
- Keep exports organized

## Summary

The project structure provides:

- **Clear Organization** - Logical folder structure
- **Consistent Naming** - Standard naming conventions
- **Separation of Concerns** - Components, hooks, utils, types separated
- **Scalability** - Easy to extend and maintain
- **Discoverability** - Easy to find files and components

