# State Management

## Overview

This document outlines universal state management approach, React hooks usage, and state patterns for React + Vite + TypeScript projects.

## State Management Strategy

### React Built-in State

Applications use React's built-in state management:

- **useState** - Component-level state
- **useReducer** - Complex state logic
- **Context API** - Global/shared state
- **Custom Hooks** - Reusable stateful logic

### No External State Library

The application does not use external state management libraries (Redux, Zustand, etc.). React's built-in state management is sufficient for the application's needs.

## Local State

### useState Hook

Use `useState` for simple component-level state:

```tsx
import { useState } from 'react'

function MyComponent() {
  const [count, setCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  )
}
```

### useReducer Hook

Use `useReducer` for complex state logic:

```tsx
import { useReducer } from 'react'

type State = {
  count: number
  step: number
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'setStep'; step: number }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step }
    case 'decrement':
      return { ...state, count: state.count - state.step }
    case 'reset':
      return { ...state, count: 0 }
    case 'setStep':
      return { ...state, step: action.step }
    default:
      return state
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 })
  
  return (
    <div>
      <button onClick={() => dispatch({ type: 'increment' })}>
        +{state.step}
      </button>
      <span>{state.count}</span>
      <button onClick={() => dispatch({ type: 'decrement' })}>
        -{state.step}
      </button>
    </div>
  )
}
```

## Global State

### Context API

Use React Context for global/shared state:

```tsx
// ThemeContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
```

### Context Usage

```tsx
// App.tsx
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  )
}

// Component.tsx
import { useTheme } from './contexts/ThemeContext'

function Component() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  )
}
```

## Custom Hooks

### Reusable Stateful Logic

Extract stateful logic into custom hooks:

```tsx
// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react'

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })
  
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }
  
  return [storedValue, setValue] as const
}

// Usage
function MyComponent() {
  const [name, setName] = useLocalStorage('name', '')
  
  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  )
}
```

## Form State Management

### React Hook Form

For complex forms, use React Hook Form:

```tsx
import { useForm } from 'react-hook-form'

interface FormData {
  name: string
  email: string
}

function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  
  const onSubmit = (data: FormData) => {
    console.log(data)
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        {...register('name', { required: 'Name is required' })}
        error={errors.name?.message}
      />
      <Input
        label="Email"
        type="email"
        {...register('email', { required: 'Email is required' })}
        error={errors.email?.message}
      />
      <Button type="submit">Submit</Button>
    </form>
  )
}
```

## State Patterns

### Lifting State Up

When multiple components need the same state, lift it to a common ancestor:

```tsx
// ✅ Good: State lifted to parent
function Parent() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <ChildA count={count} />
      <ChildB count={count} setCount={setCount} />
    </div>
  )
}

// ❌ Bad: Duplicate state
function ChildA() {
  const [count] = useState(0) // Duplicate
}

function ChildB() {
  const [count, setCount] = useState(0) // Duplicate
}
```

### State Colocation

Keep state as close to where it's used as possible:

```tsx
// ✅ Good: State colocated
function UserCard({ user }: { user: User }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <div>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
      {isExpanded && <UserDetails user={user} />}
    </div>
  )
}

// ❌ Bad: State lifted unnecessarily
function Parent() {
  const [isExpanded, setIsExpanded] = useState(false) // Only used in UserCard
  return <UserCard isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
}
```

## Performance Optimization

### Memoization

Use memoization to prevent unnecessary re-renders:

```tsx
import { useMemo, useCallback } from 'react'

function ExpensiveComponent({ data }: { data: Data[] }) {
  // Memoize expensive calculation
  const processedData = useMemo(() => {
    return data.map(item => expensiveProcessing(item))
  }, [data])
  
  // Memoize callback
  const handleClick = useCallback(() => {
    doSomething()
  }, [])
  
  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} item={item} onClick={handleClick} />
      ))}
    </div>
  )
}
```

### React.memo

Memoize components to prevent unnecessary re-renders:

```tsx
import { memo } from 'react'

const UserCard = memo(({ user }: { user: User }) => {
  return <div>{user.name}</div>
})

// Only re-renders if user prop changes
```

## State Best Practices

### 1. Minimize Global State

Keep global state to a minimum:

```tsx
// ✅ Good: Only truly global state in context
const ThemeContext = createContext<Theme>()

// ❌ Bad: Everything in global state
const EverythingContext = createContext<Everything>()
```

### 2. Use Appropriate State Type

Choose the right state management approach:

- **useState** - Simple component state
- **useReducer** - Complex state logic
- **Context** - Global/shared state
- **Custom Hooks** - Reusable stateful logic

### 3. Avoid Prop Drilling

Use Context for deeply nested props:

```tsx
// ✅ Good: Context for deep nesting
<ThemeProvider>
  <Layout>
    <Sidebar>
      <MenuItem /> {/* Can access theme via context */}
    </Sidebar>
  </Layout>
</ThemeProvider>

// ❌ Bad: Prop drilling
<Layout theme={theme}>
  <Sidebar theme={theme}>
    <MenuItem theme={theme} /> {/* Props passed through */}
  </Sidebar>
</Layout>
```

### 4. Keep State Updates Pure

State updates should be predictable:

```tsx
// ✅ Good: Pure update
setCount(prev => prev + 1)

// ❌ Bad: Impure update
setCount(count + 1) // May use stale value
```

## Summary

State management provides:

- **Local State** - Component-level state with useState/useReducer
- **Global State** - Shared state with Context API
- **Custom Hooks** - Reusable stateful logic
- **Form State** - React Hook Form for forms
- **Performance** - Memoization for optimization
- **Best Practices** - Appropriate state management patterns

