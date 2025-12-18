# Routing

## Overview

This document outlines universal routing structure, navigation patterns, and route organization for React + Vite + TypeScript projects.

## Routing Library

### React Router

Applications use **React Router** for client-side routing.

**Version**: 6.20.0 or higher

**Documentation**: https://reactrouter.com

## Route Structure

### Route Configuration

Routes are configured in `routes/index.tsx`:

```tsx
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Dashboard from '../pages/Dashboard'
import Settings from '../pages/Settings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
])
```

### Route Organization

Routes are organized hierarchically:

```
/                    # Dashboard (index route)
/settings            # Settings page
/help                # Help page
```

## Navigation Patterns

### Header Navigation

Main navigation links in the header:

```tsx
import { Link } from 'react-router-dom'

<nav>
  <Link to="/">Dashboard</Link>
  <Link to="/settings">Settings</Link>
  <Link to="/help">Help</Link>
</nav>
```

### Sidebar Navigation

Collapsible sidebar with menu items:

```tsx
import { NavLink } from 'react-router-dom'

<nav>
  <NavLink to="/" end>
    Dashboard
  </NavLink>
  <NavLink to="/settings">
    Settings
  </NavLink>
</nav>
```

### Active Link Styling

Use `NavLink` for active state styling:

```tsx
<NavLink
  to="/settings"
  className={({ isActive }) =>
    isActive
      ? 'text-primary-600 dark:text-primary-400'
      : 'text-gray-700 dark:text-gray-300'
  }
>
  Settings
</NavLink>
```

## Route Components

### Page Components

Page components are located in `pages/`:

- `Dashboard.tsx` - Dashboard page
- `Settings.tsx` - Settings page
- `Help.tsx` - Help page

### Layout Components

Layout components wrap routes:

- `Layout.tsx` - Main layout wrapper
- `Header.tsx` - Header with navigation
- `Sidebar.tsx` - Sidebar navigation

## Protected Routes

### Authentication (if applicable)

If authentication is required, protect routes:

```tsx
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuth() // Your auth hook
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return <>{children}</>
}

// Usage
{
  path: '/settings',
  element: (
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  ),
}
```

## Nested Routes

### Nested Route Structure

Support for nested routes:

```tsx
{
  path: '/settings',
  element: <Settings />,
  children: [
    {
      path: 'general',
      element: <GeneralSettings />,
    },
    {
      path: 'advanced',
      element: <AdvancedSettings />,
    },
  ],
}
```

## Route Parameters

### Dynamic Routes

Use route parameters for dynamic routes:

```tsx
{
  path: '/user/:id',
  element: <UserProfile />,
}

// In component
import { useParams } from 'react-router-dom'

function UserProfile() {
  const { id } = useParams<{ id: string }>()
  // Use id
}
```

## Navigation Hooks

### useNavigate

Programmatic navigation:

```tsx
import { useNavigate } from 'react-router-dom'

function MyComponent() {
  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate('/settings')
  }
  
  return <button onClick={handleClick}>Go to Settings</button>
}
```

### useLocation

Access current location:

```tsx
import { useLocation } from 'react-router-dom'

function MyComponent() {
  const location = useLocation()
  
  // location.pathname, location.search, etc.
}
```

## Breadcrumbs

### Breadcrumb Navigation

Implement breadcrumbs for nested routes:

```tsx
import { useLocation, Link } from 'react-router-dom'

function Breadcrumbs() {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)
  
  return (
    <nav>
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
        return (
          <span key={routeTo}>
            / <Link to={routeTo}>{name}</Link>
          </span>
        )
      })}
    </nav>
  )
}
```

## Deep Linking

### Direct URL Access

All routes support direct URL access:

- `/settings` - Direct access to settings
- `/help` - Direct access to help
- `/user/123` - Direct access to user profile (if applicable)

### 404 Handling

Handle unknown routes:

```tsx
{
  path: '*',
  element: <NotFound />,
}
```

## Code Splitting

### Lazy Loading Routes

Lazy load routes for code splitting:

```tsx
import { lazy, Suspense } from 'react'

const Settings = lazy(() => import('../pages/Settings'))

{
  path: 'settings',
  element: (
    <Suspense fallback={<div>Loading...</div>}>
      <Settings />
    </Suspense>
  ),
}
```

## Route Organization Best Practices

### 1. Centralized Configuration

Keep all routes in `routes/index.tsx`:

```tsx
// ✅ Good: Centralized
export const router = createBrowserRouter([...])

// ❌ Bad: Scattered routes
// Routes defined in multiple files
```

### 2. Clear Route Names

Use descriptive route paths:

```tsx
// ✅ Good: Clear paths
/settings
/help
/user/:id

// ❌ Bad: Unclear paths
/s1
/h
/u/:id
```

### 3. Consistent Structure

Follow consistent route structure:

```tsx
// ✅ Good: Consistent
{
  path: '/settings',
  element: <Settings />,
}

// ❌ Bad: Inconsistent
{
  path: 'settings', // Missing leading slash
  element: Settings, // Missing JSX
}
```

## Summary

Routing provides:

- **Client-Side Routing** - Fast navigation without page reloads
- **Nested Routes** - Support for nested route structures
- **Protected Routes** - Authentication/authorization support
- **Code Splitting** - Lazy loading for performance
- **Deep Linking** - Direct URL access to routes
- **Navigation Hooks** - Programmatic navigation

