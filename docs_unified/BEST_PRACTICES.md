# Best Practices

## Overview

This document outlines universal best practices for developing React + Vite + TypeScript projects. These practices ensure code quality, maintainability, consistency, and efficient development.

## Package Management

### ⚠️ CRITICAL: Use Only Latest Stable Packages

**MANDATORY RULE**: Always use the **latest stable versions** of all packages. Never use outdated, deprecated, or old packages.

### Package Selection Guidelines

1. **Always Choose Latest Stable**
   - Check npm registry for latest stable version before installing
   - Use `npm view <package> version` to verify latest version
   - Avoid beta, alpha, or release candidate versions
   - Prefer LTS versions when available

2. **Avoid Old Packages**
   ```bash
   # ❌ Bad: Installing old versions
   npm install react@17.0.0
   npm install vite@4.0.0
   
   # ✅ Good: Installing latest stable
   npm install react@latest
   npm install vite@latest
   ```

3. **Version Range Best Practices**
   ```json
   // ✅ Good: Allow minor updates
   {
     "dependencies": {
       "react": "^18.3.0",
       "vite": "^5.0.0"
     }
   }
   
   // ❌ Bad: Exact versions (too restrictive)
   {
     "dependencies": {
       "react": "18.2.0",
       "vite": "5.0.0"
     }
   }
   
   // ❌ Bad: Using latest tag
   {
     "dependencies": {
       "react": "latest"
     }
   }
   ```

4. **Regular Updates**
   - Run `npm outdated` regularly to check for updates
   - Update dependencies monthly or as needed
   - Test thoroughly after updates
   - Review changelogs for breaking changes

5. **Security First**
   - Run `npm audit` regularly
   - Fix security vulnerabilities immediately
   - Update to latest stable versions for security patches

### Package Installation Checklist

Before installing a new package:

- [ ] Check if package is actively maintained
- [ ] Verify latest stable version
- [ ] Check for security vulnerabilities (`npm audit`)
- [ ] Review package documentation
- [ ] Check compatibility with existing dependencies
- [ ] Verify license compatibility
- [ ] Check bundle size impact (if applicable)

### Deprecated Packages

**NEVER use deprecated packages**. If you encounter a deprecated package:

1. **Find Alternative**
   - Check package documentation for recommended replacement
   - Search for modern alternatives
   - Verify alternative is actively maintained

2. **Migrate**
   - Plan migration to alternative package
   - Update code to use new package
   - Test thoroughly
   - Update documentation

3. **Remove**
   - Remove deprecated package from dependencies
   - Clean up unused code
   - Update package.json

### Example: Package Selection

```bash
# ✅ Good: Check latest version first
npm view react version
# Output: 18.3.1

# ✅ Good: Install latest stable
npm install react@^18.3.1

# ❌ Bad: Install without checking
npm install react@17.0.0  # Old version

# ❌ Bad: Install exact old version
npm install react@18.2.0  # Not latest
```

## Code Organization

### File Structure

- **Components**: PascalCase for component files (`UserForm.tsx`)
- **Utilities**: camelCase for utility files (`formatDate.ts`)
- **Hooks**: camelCase with `use` prefix (`useTheme.ts`)
- **Types**: camelCase for type files (`user.types.ts`)

### Folder Organization

- Group related files together
- Use feature-based organization for large features
- Keep common components in `components/common/`
- Separate concerns (components, hooks, utils, types)

### Import Organization

```tsx
// 1. React and external libraries
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

// 2. Internal components
import { Input, Button, Modal } from '../../common'
import UserCard from '../UserCard'

// 3. Hooks
import { useTheme } from '../../hooks/useTheme'

// 4. Utils
import { formatDate } from '../../utils/formatDate'

// 5. Types
import type { User } from '../../types'
```

## Naming Conventions

### Components

- **Component Names**: PascalCase (`UserForm`, `DashboardCard`)
- **Component Files**: Match component name (`UserForm.tsx`)
- **Props Interfaces**: Component name + Props (`UserFormProps`)

### Variables and Functions

- **Variables**: camelCase (`userName`, `isLoading`)
- **Functions**: camelCase (`handleSubmit`, `formatDate`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRIES`, `API_BASE_URL`)
- **Boolean Variables**: Prefix with `is`, `has`, `should` (`isLoading`, `hasError`)

### Types and Interfaces

- **Interfaces**: PascalCase (`User`, `FormData`)
- **Types**: PascalCase (`UserStatus`, `ApiResponse`)
- **Generic Types**: Single uppercase letter (`T`, `K`, `V`)

## Component Development

### Component Structure

```tsx
// 1. Imports
import React from 'react'
import { Input, Button } from '../../common'

// 2. Types
interface UserFormProps {
  user?: User
  onSubmit: (data: UserData) => void
  onCancel: () => void
}

// 3. Component
export default function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  // 4. Hooks
  const { theme } = useTheme()
  
  // 5. State
  const [isLoading, setIsLoading] = useState(false)
  
  // 6. Handlers
  const handleSubmit = async (data: UserData) => {
    setIsLoading(true)
    try {
      await onSubmit(data)
    } finally {
      setIsLoading(false)
    }
  }
  
  // 7. Render
  return (
    <form onSubmit={handleSubmit}>
      {/* Form content */}
    </form>
  )
}
```

### Component Best Practices

1. **Single Responsibility** - Each component should have one clear purpose
2. **Composition over Inheritance** - Compose components rather than inherit
3. **Props Validation** - Use TypeScript for prop validation
4. **Default Props** - Provide sensible defaults where appropriate
5. **Memoization** - Use React.memo for expensive components
6. **Extract Logic** - Move complex logic to custom hooks

## TypeScript Best Practices

### Type Safety

- **Strict Mode**: Enable strict TypeScript settings
- **No `any` Types**: Avoid `any`, use `unknown` if type is truly unknown
- **Type Definitions**: Define types for all props, state, and functions
- **Generic Types**: Use generics for reusable components

### Type Definitions

```tsx
// ✅ Good: Explicit types
interface User {
  id: string
  name: string
  email: string
}

function getUser(id: string): Promise<User> {
  // ...
}

// ❌ Bad: Using any
function getUser(id: any): any {
  // ...
}
```

### Type Inference

- Let TypeScript infer types when obvious
- Explicitly type function parameters and return types
- Use type assertions sparingly

## Performance Optimization

### React Optimization

1. **Memoization**
   - Use `React.memo` for components that re-render frequently
   - Use `useMemo` for expensive calculations
   - Use `useCallback` for function references passed to children

2. **Code Splitting**
   - Lazy load routes with `React.lazy`
   - Split large components into smaller chunks
   - Use dynamic imports for heavy dependencies

3. **Avoid Unnecessary Re-renders**
   - Keep state as local as possible
   - Use context sparingly
   - Optimize context providers

### Example: Memoization

```tsx
// ✅ Good: Memoized component
const UserCard = React.memo(({ user }: { user: User }) => {
  return <div>{user.name}</div>
})

// ✅ Good: Memoized calculation
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data)
}, [data])

// ✅ Good: Memoized callback
const handleClick = useCallback(() => {
  doSomething(id)
}, [id])
```

## Error Handling

### Error Boundaries

- Use error boundaries for component tree error handling
- Provide fallback UI for errors
- Log errors appropriately

### Error Handling Patterns

```tsx
// ✅ Good: Try-catch with proper error handling
const handleSubmit = async (data: FormData) => {
  try {
    setIsLoading(true)
    await submitForm(data)
    showSuccess('Form submitted successfully')
  } catch (error) {
    if (error instanceof Error) {
      showError(error.message)
    } else {
      showError('An unexpected error occurred')
    }
  } finally {
    setIsLoading(false)
  }
}
```

## Code Quality

### Code Review Checklist

- [ ] Follows naming conventions
- [ ] Uses reusable components (no inline form styles)
- [ ] Includes dark mode support
- [ ] TypeScript types are correct
- [ ] Error handling is appropriate
- [ ] Accessibility considerations
- [ ] Performance optimizations where needed
- [ ] Documentation is updated

### Common Patterns

#### ✅ DO: Use These Patterns

1. **Reusable Components**
   ```tsx
   import Input from '../../common/Input'
   <Input label="Email" {...register('email')} />
   ```

2. **Dark Mode Support**
   ```tsx
   <div className="bg-white dark:bg-dark-bg-secondary">
     <h2 className="text-gray-900 dark:text-white">Title</h2>
   </div>
   ```

3. **Type Safety**
   ```tsx
   interface Props {
     title: string
     onSubmit: (data: FormData) => void
   }
   ```

4. **Error Handling**
   ```tsx
   try {
     await operation()
   } catch (error) {
     handleError(error)
   }
   ```

#### ❌ DON'T: Avoid These Anti-Patterns

1. **Inline Form Styles**
   ```tsx
   // ❌ Bad
   <input className="w-full px-4 py-2 border..." />
   
   // ✅ Good
   <Input label="Email" {...register('email')} />
   ```

2. **Missing Dark Mode**
   ```tsx
   // ❌ Bad
   <h1 className="text-gray-900">Title</h1>
   
   // ✅ Good
   <h1 className="text-gray-900 dark:text-white">Title</h1>
   ```

3. **Using `any` Type**
   ```tsx
   // ❌ Bad
   function process(data: any) { }
   
   // ✅ Good
   function process(data: UserData) { }
   ```

4. **Unnecessary Re-renders**
   ```tsx
   // ❌ Bad: Creates new function on every render
   <Child onClick={() => handleClick(id)} />
   
   // ✅ Good: Memoized callback
   const handleClick = useCallback(() => {
     doSomething(id)
   }, [id])
   <Child onClick={handleClick} />
   ```

## Documentation

### Code Comments

- Use comments to explain "why", not "what"
- Keep comments up to date with code changes
- Remove commented-out code

### Component Documentation

- Document all component props
- Include usage examples
- Explain complex logic
- Update documentation when components change

## Testing

### Testing Best Practices

1. **Unit Tests** - Test individual functions and components
2. **Integration Tests** - Test component interactions
3. **Accessibility Tests** - Verify accessibility requirements
4. **Visual Tests** - Test in both light and dark themes

### Test Structure

```tsx
describe('UserForm', () => {
  it('renders form fields correctly', () => {
    // Test implementation
  })
  
  it('handles form submission', async () => {
    // Test implementation
  })
  
  it('displays error messages', () => {
    // Test implementation
  })
})
```

## Accessibility

### Accessibility Best Practices

1. **Semantic HTML** - Use appropriate HTML elements
2. **ARIA Labels** - Provide ARIA labels where needed
3. **Keyboard Navigation** - Ensure full keyboard support
4. **Focus Management** - Clear focus indicators
5. **Color Contrast** - Meet WCAG contrast requirements

### Example: Accessible Form

```tsx
<form>
  <label htmlFor="email">
    Email Address
    <Input
      id="email"
      type="email"
      aria-required="true"
      aria-describedby="email-error"
      {...register('email')}
      error={errors.email?.message}
    />
  </label>
  {errors.email && (
    <div id="email-error" role="alert">
      {errors.email.message}
    </div>
  )}
</form>
```

## Summary

Key takeaways:

1. **Code Organization** - Clear structure and naming conventions
2. **Component Patterns** - Reusable components, composition
3. **Type Safety** - Full TypeScript coverage
4. **Performance** - Optimize with memoization and code splitting
5. **Error Handling** - Proper error boundaries and handling
6. **Accessibility** - WCAG compliant, keyboard navigation
7. **Documentation** - Keep documentation updated
8. **Testing** - Comprehensive test coverage

Following these practices ensures a maintainable, performant, and accessible codebase.

