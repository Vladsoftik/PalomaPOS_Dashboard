# Testing

## Overview

This document outlines universal testing strategies, test structure, and testing guidelines for React + Vite + TypeScript projects.

## Testing Strategy

### Testing Levels

1. **Unit Tests** - Test individual functions and components
2. **Integration Tests** - Test component interactions
3. **E2E Tests** - Test complete user flows (if applicable)

### Testing Tools

- **Vitest** - Unit testing framework (recommended with Vite)
- **React Testing Library** - Component testing
- **Jest** - Alternative testing framework (if not using Vitest)

## Unit Testing

### Testing Utilities

Test utility functions:

```typescript
// utils/formatDate.ts
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US')
}

// utils/formatDate.test.ts
import { describe, it, expect } from 'vitest'
import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-15')
    expect(formatDate(date)).toBe('1/15/2024')
  })
})
```

### Testing Hooks

Test custom hooks:

```typescript
// hooks/useCounter.test.ts
import { renderHook, act } from '@testing-library/react'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  it('increments count', () => {
    const { result } = renderHook(() => useCounter())
    
    act(() => {
      result.current.increment()
    })
    
    expect(result.current.count).toBe(1)
  })
})
```

## Component Testing

### Testing Components

Test React components with React Testing Library:

```tsx
// components/common/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Button from './Button'

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
  
  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
  
  it('applies variant classes', () => {
    render(<Button variant="secondary">Click me</Button>)
    const button = screen.getByText('Click me')
    expect(button).toHaveClass('bg-gray-200')
  })
})
```

### Testing Forms

Test form components:

```tsx
// components/UserForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import UserForm from './UserForm'

describe('UserForm', () => {
  it('submits form with valid data', async () => {
    const onSubmit = vi.fn()
    render(<UserForm onSubmit={onSubmit} />)
    
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' }
    })
    fireEvent.click(screen.getByText('Submit'))
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com'
      })
    })
  })
  
  it('displays validation errors', async () => {
    render(<UserForm onSubmit={vi.fn()} />)
    
    fireEvent.click(screen.getByText('Submit'))
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
    })
  })
})
```

## Integration Testing

### Testing Component Interactions

Test how components work together:

```tsx
// components/Dashboard.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Dashboard from './Dashboard'

describe('Dashboard', () => {
  it('displays dashboard cards', () => {
    render(<Dashboard />)
    expect(screen.getByText('Total Users')).toBeInTheDocument()
    expect(screen.getByText('Active Users')).toBeInTheDocument()
  })
  
  it('updates stats when filters change', async () => {
    render(<Dashboard />)
    // Test filter interaction
  })
})
```

## Dark Mode Testing

### Testing Theme Support

Test components in both light and dark modes:

```tsx
// components/common/Button.test.tsx
describe('Button - Dark Mode', () => {
  it('applies dark mode classes', () => {
    document.documentElement.classList.add('dark')
    render(<Button>Click me</Button>)
    const button = screen.getByText('Click me')
    expect(button).toHaveClass('dark:bg-gray-700')
  })
  
  it('applies light mode classes', () => {
    document.documentElement.classList.remove('dark')
    render(<Button>Click me</Button>)
    const button = screen.getByText('Click me')
    expect(button).toHaveClass('bg-white')
  })
})
```

## Accessibility Testing

### Testing Accessibility

Test accessibility features:

```tsx
// components/common/Input.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Input from './Input'

describe('Input - Accessibility', () => {
  it('has accessible label', () => {
    render(<Input label="Email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })
  
  it('shows required indicator', () => {
    render(<Input label="Email" required />)
    expect(screen.getByText('*')).toBeInTheDocument()
  })
  
  it('displays error message', () => {
    render(<Input label="Email" error="Invalid email" />)
    expect(screen.getByText('Invalid email')).toBeInTheDocument()
  })
})
```

## Test Structure

### Test File Organization

Organize tests alongside source files:

```
components/
├── common/
│   ├── Button.tsx
│   └── Button.test.tsx
├── features/
│   └── Dashboard/
│       ├── Dashboard.tsx
│       └── Dashboard.test.tsx
```

### Test Naming

- Test files: `ComponentName.test.tsx` or `ComponentName.spec.tsx`
- Test suites: `describe('ComponentName', () => { ... })`
- Test cases: `it('should do something', () => { ... })`

## Test Best Practices

### 1. Test User Behavior

Test what users see and interact with:

```tsx
// ✅ Good: Test user behavior
it('displays error when form is invalid', () => {
  render(<Form />)
  fireEvent.click(screen.getByText('Submit'))
  expect(screen.getByText('Name is required')).toBeInTheDocument()
})

// ❌ Bad: Test implementation details
it('sets error state to true', () => {
  // Testing internal state
})
```

### 2. Use Descriptive Test Names

Test names should describe what is being tested:

```tsx
// ✅ Good: Descriptive
it('displays error message when email is invalid', () => { ... })

// ❌ Bad: Vague
it('works correctly', () => { ... })
```

### 3. Keep Tests Simple

Each test should verify one thing:

```tsx
// ✅ Good: Single assertion
it('increments count when button is clicked', () => {
  // Test increment
})

// ❌ Bad: Multiple assertions
it('handles all button interactions', () => {
  // Test increment, decrement, reset, etc.
})
```

### 4. Use Test Data

Create test data for consistent testing:

```tsx
// test-utils/testData.ts
export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com'
}

// Component.test.tsx
import { mockUser } from '../../test-utils/testData'

it('displays user information', () => {
  render(<UserCard user={mockUser} />)
  expect(screen.getByText('John Doe')).toBeInTheDocument()
})
```

## Test Coverage

### Coverage Goals

- **Components**: 80%+ coverage
- **Utilities**: 90%+ coverage
- **Hooks**: 80%+ coverage

### Coverage Reports

Generate coverage reports:

```bash
npm run test:coverage
```

## Running Tests

### Development

Run tests in watch mode:

```bash
npm run test
```

### CI/CD

Run tests in CI/CD pipeline:

```bash
npm run test:ci
```

## Summary

Testing provides:

- **Unit Tests** - Test individual functions and components
- **Integration Tests** - Test component interactions
- **Accessibility Tests** - Verify accessibility requirements
- **Dark Mode Tests** - Test both themes
- **Best Practices** - Consistent testing patterns
- **Coverage** - Ensure adequate test coverage

