# Frontend Development Guide

## Overview

This document outlines the frontend development approach, component architecture, and best practices for React + Vite + TypeScript projects. The frontend follows a **component-based architecture** with reusable UI components to ensure consistency, maintainability, and efficient development.

## ⚠️ Critical Workflow: Documentation First, Code Second

**IMPORTANT**: When adding new components, features, or making changes:

1. **ALWAYS update documentation FIRST**
   - Update this document (`docs_unified/FRONTEND_DEVELOPMENT.md`) BEFORE writing code
   - Document component purpose, props, usage examples, and patterns
   - This ensures the implementation matches the documented requirements

2. **THEN implement the code**
   - After documentation is updated, implement the component according to the documentation
   - Code should follow the patterns and requirements documented here

For detailed workflow instructions, see `docs_unified/CURSOR_BEST_PRACTICES.md` section "Documentation-Driven Development".

## Component Architecture

### Core Principle: Reusable Components

**All UI elements must use reusable components instead of inline styles.** This ensures:
- **Consistency** - Uniform styling and behavior across the application
- **Maintainability** - Single source of truth for component styles
- **Efficiency** - Faster development with pre-built components
- **Dark Mode Support** - Automatic theme support built into components
- **Accessibility** - Built-in accessibility features

### Component Structure

```
frontend/src/components/
├── common/              # Reusable UI components
│   ├── Input.tsx        # Form input component
│   ├── Textarea.tsx     # Textarea component
│   ├── Select.tsx       # Select dropdown component
│   ├── Checkbox.tsx     # Checkbox component
│   ├── Label.tsx        # Form label component
│   ├── FormField.tsx    # Form field wrapper
│   ├── Button.tsx       # Button component
│   ├── Modal.tsx        # Modal dialog component
│   ├── Heading.tsx      # Heading component (h1-h6)
│   ├── Text.tsx         # Text component with variants
│   ├── Toast.tsx        # Toast notification
│   └── index.ts         # Barrel exports
└── features/            # Feature-specific components
    ├── Dashboard/
    ├── Settings/
    └── ...
```

## Reusable Components

### Input Component

**Location**: `frontend/src/components/common/Input.tsx`

**Usage**:
```tsx
import Input from '../../common/Input'

// Basic usage
<Input 
  label="Username" 
  required
  {...register('username')} 
  error={errors.username?.message} 
/>

// With custom props
<Input
  type="email"
  label="Email Address"
  placeholder="Enter your email"
  required
  {...register('email')}
  error={errors.email?.message}
/>
```

**Features**:
- Automatic label rendering
- Required field indicator (*)
- Error message display
- Dark mode support
- Consistent styling
- Forward ref support for react-hook-form

**Props**:
- `label?: string` - Field label
- `required?: boolean` - Show required indicator
- `error?: string` - Error message to display
- All standard HTML input attributes

### Textarea Component

**Location**: `frontend/src/components/common/Textarea.tsx`

**Usage**:
```tsx
import Textarea from '../../common/Textarea'

<Textarea
  label="Description"
  rows={4}
  {...register('description')}
  error={errors.description?.message}
/>
```

**Features**:
- Same features as Input component
- Configurable rows
- Automatic dark mode support

### Select Component

**Location**: `frontend/src/components/common/Select.tsx`

**Usage**:
```tsx
import Select from '../../common/Select'

// With options array
<Select
  label="Payment Type"
  required
  {...register('paymentType')}
  options={[
    { value: 'monthly', label: 'Monthly' },
    { value: 'annual', label: 'Annual' },
    { value: 'one-time', label: 'One-time' }
  ]}
  error={errors.paymentType?.message}
/>

// With children
<Select label="Status" {...register('status')}>
  <option value="">Select status</option>
  <option value="active">Active</option>
  <option value="inactive">Inactive</option>
</Select>
```

**Features**:
- Options array or children support
- Automatic dark mode support
- Error handling

### Checkbox Component

**Location**: `frontend/src/components/common/Checkbox.tsx`

**Usage**:
```tsx
import Checkbox from '../../common/Checkbox'

// With react-hook-form (uncontrolled)
<Checkbox
  label="Active"
  {...register('active')}
/>

// Controlled pattern
<Checkbox
  label="Primary Owner"
  checked={isPrimaryOwner}
  onChange={(e) => setIsPrimaryOwner(e.target.checked)}
/>

// With error message
<Checkbox
  label="Accept Terms"
  {...register('terms')}
  error={errors.terms?.message}
/>
```

**Features**:
- Works with `react-hook-form`'s `register()` pattern
- Supports both controlled and uncontrolled patterns
- Automatic label rendering
- Error message display
- Automatic dark mode support
- Forward ref support for form libraries
- Consistent styling across application

**Props**:
- `label?: string` - Checkbox label text
- `error?: string` - Error message to display
- All standard HTML checkbox input attributes

**Important Notes**:
- **Always use the reusable Checkbox component** - Never use inline `<input type="checkbox">` with custom classes
- Works seamlessly with `react-hook-form` using `{...register('fieldName')}`
- Supports both controlled (`checked` + `onChange`) and uncontrolled (`defaultChecked` or `{...register()}`) patterns

### Button Component

**Location**: `frontend/src/components/common/Button.tsx`

**Usage**:
```tsx
import Button from '../../common/Button'

// Primary button (default)
<Button type="submit">Save</Button>

// Secondary button
<Button variant="secondary" onClick={onCancel}>Cancel</Button>

// Danger button
<Button variant="danger" onClick={handleDelete}>Delete</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

**Variants**:
- `primary` (default) - Primary action button
- `secondary` - Secondary action button
- `danger` - Destructive action button
- `ghost` - Minimal style button

**Sizes**:
- `sm` - Small button
- `md` (default) - Medium button
- `lg` - Large button

### Modal Component

**Location**: `frontend/src/components/common/Modal.tsx`

**Usage**:
```tsx
import Modal from '../../common/Modal'
import Button from '../../common/Button'

<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Edit User"
  maxWidth="2xl"
  footer={
    <div className="flex justify-end gap-4">
      <Button variant="secondary" onClick={onClose}>Cancel</Button>
      <Button type="submit" form="user-form">Save</Button>
    </div>
  }
>
  <form id="user-form" onSubmit={handleSubmit(onSubmit)}>
    {/* Form content */}
  </form>
</Modal>
```

**Features**:
- Automatic dark mode support
- Configurable max width
- Optional footer
- Close button
- Backdrop click handling

**Max Width Options**:
- `sm` - Small modal
- `md` - Medium modal
- `lg` - Large modal
- `xl` - Extra large modal
- `2xl` (default) - 2X large modal

### Heading Component

**Location**: `frontend/src/components/common/Heading.tsx`

**Usage**:
```tsx
import Heading from '../../common/Heading'

<Heading level={1}>Main Title</Heading>
<Heading level={2}>Section Title</Heading>
<Heading level={3}>Subsection Title</Heading>
```

**Features**:
- Automatic dark mode support
- Semantic HTML (h1-h6)
- Consistent styling
- Configurable levels

### Text Component

**Location**: `frontend/src/components/common/Text.tsx`

**Usage**:
```tsx
import Text from '../../common/Text'

<Text variant="primary">Main content</Text>
<Text variant="secondary">Secondary content</Text>
<Text variant="muted">Helper text</Text>
```

**Variants**:
- `primary` - Primary text color
- `secondary` - Secondary text color
- `muted` - Muted text color

**Features**:
- Automatic dark mode support
- Consistent text styling
- Multiple variants

## Text Color Guidelines

### Unified Text Colors

**All text elements must use unified dark mode styling.** Never use hardcoded text colors without dark mode variants.

#### Required Text Color Patterns

1. **Headings (h1-h6)**:
   ```tsx
   // ✅ CORRECT - Use Heading component or add dark mode
   <Heading level={1}>Title</Heading>
   // OR
   <h1 className="text-gray-900 dark:text-white">Title</h1>
   
   // ❌ WRONG - Missing dark mode
   <h1 className="text-gray-900">Title</h1>
   ```

2. **Primary Text**:
   ```tsx
   // ✅ CORRECT
   <Text variant="primary">Main content</Text>
   // OR
   <p className="text-gray-900 dark:text-white">Main content</p>
   
   // ❌ WRONG
   <p className="text-gray-900">Main content</p>
   ```

3. **Secondary Text**:
   ```tsx
   // ✅ CORRECT
   <Text variant="secondary">Secondary content</Text>
   // OR
   <p className="text-gray-700 dark:text-gray-300">Secondary content</p>
   
   // ❌ WRONG
   <p className="text-gray-700">Secondary content</p>
   ```

4. **Muted Text**:
   ```tsx
   // ✅ CORRECT
   <Text variant="muted">Helper text</Text>
   // OR
   <p className="text-gray-600 dark:text-gray-400">Helper text</p>
   
   // ❌ WRONG
   <p className="text-gray-600">Helper text</p>
   ```

5. **Labels**:
   ```tsx
   // ✅ CORRECT
   <label className="text-gray-700 dark:text-gray-300">Field Label</label>
   
   // ❌ WRONG
   <label className="text-gray-700">Field Label</label>
   ```

#### Text Color Mapping

| Light Mode | Dark Mode | Usage |
|------------|-----------|-------|
| `text-gray-900` | `dark:text-white` | Primary headings, main text |
| `text-gray-700` | `dark:text-gray-300` | Secondary text, labels |
| `text-gray-600` | `dark:text-gray-400` | Muted text, descriptions |
| `text-gray-500` | `dark:text-gray-400` | Placeholder text, hints |
| `text-gray-400` | `dark:text-gray-500` | Disabled text, icons |

#### Background Colors

All containers must also support dark mode:

```tsx
// ✅ CORRECT
<div className="bg-white dark:bg-dark-bg-secondary">
  <h2 className="text-gray-900 dark:text-white">Title</h2>
</div>

// ❌ WRONG
<div className="bg-white">
  <h2 className="text-gray-900">Title</h2>
</div>
```

## Development Guidelines

### ✅ DO: Use Reusable Components

```tsx
// ✅ CORRECT: Use reusable Input component
import Input from '../../common/Input'

<Input
  label="Email"
  type="email"
  {...register('email')}
  error={errors.email?.message}
/>
```

### ❌ DON'T: Use Inline Styles

```tsx
// ❌ WRONG: Inline className with repeated styles
<input
  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
  {...register('email')}
/>
```

### Form Development Pattern

**Before (Inline Styles)**:
```tsx
<form onSubmit={handleSubmit(onSubmit)}>
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Username *
    </label>
    <input
      {...register('username')}
      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
    />
    {errors.username && (
      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.username.message}</p>
    )}
  </div>
</form>
```

**After (Reusable Components)**:
```tsx
import Input from '../../common/Input'

<form onSubmit={handleSubmit(onSubmit)}>
  <Input
    label="Username"
    required
    {...register('username')}
    error={errors.username?.message}
  />
</form>
```

### Modal Development Pattern

**Before (Inline Styles)**:
```tsx
<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
  <div className="bg-white dark:bg-dark-bg-secondary rounded-lg shadow-xl max-w-2xl w-full">
    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Title</h2>
      <button onClick={onClose}>Close</button>
    </div>
    <div className="p-6">
      {/* Content */}
    </div>
  </div>
</div>
```

**After (Reusable Components)**:
```tsx
import Modal from '../../common/Modal'

<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Title"
>
  {/* Content */}
</Modal>
```

## Component Styling

### Dark Mode Support

All reusable components automatically support dark mode through Tailwind CSS dark mode classes. No additional configuration needed.

### Consistent Styling

Components use consistent base classes:
- **Input/Textarea/Select**: `w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`
- **Labels**: `block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2`
- **Errors**: `mt-1 text-sm text-red-600 dark:text-red-400`

### Customization

Components accept `className` prop for additional styling:
```tsx
<Input
  label="Custom Input"
  className="mb-4" // Additional classes
  {...register('field')}
/>
```

## Import Pattern

Use barrel exports from `common/index.ts`:
```tsx
import { Input, Textarea, Select, Button, Modal } from '../../common'
```

Or individual imports:
```tsx
import Input from '../../common/Input'
import Button from '../../common/Button'
```

## Component Documentation Template

### ⚠️ MANDATORY: Document Components Before Implementation

**Before creating any new component, you MUST document it in this file using the template below.**

### Documentation Template

When adding a new component, add a section following this structure:

```markdown
### [ComponentName] Component

**Location**: `frontend/src/components/[path]/[ComponentName].tsx`

**Purpose**: [Brief description of what the component does]

**Usage**:
```tsx
import [ComponentName] from '[path]'

// Basic usage example
<[ComponentName]
  prop1="value1"
  prop2={value2}
  onAction={handleAction}
/>
```

**Props**:
- `prop1: type` - Description of prop1
- `prop2: type` - Description of prop2
- `onAction: (param: type) => void` - Callback function description

**Features**:
- Feature 1 description
- Feature 2 description
- Dark mode support (if applicable)

**Integration**:
- How it integrates with other components
- Where it's used in the application
- Any dependencies
```
```

## Best Practices

### Component Usage

1. **Update documentation FIRST** - Always document new components in this file before implementation
2. **Always use reusable components** - Never write inline form field styles
3. **Import from common** - Use the barrel export or individual imports
4. **Pass props correctly** - Use component props instead of className for styling
5. **Handle errors** - Always pass error messages to components
6. **Use labels** - Always provide labels for accessibility
7. **Test dark mode** - Verify components work in both themes
8. **Keep components simple** - Don't add unnecessary complexity
9. **Verify documentation matches implementation** - Ensure code follows documented patterns

### Styling Consistency Rules

#### 1. Dark Mode is Mandatory

**CRITICAL**: Every UI element MUST support both light and dark modes. Missing dark mode variants are considered bugs.

**Required Patterns**:
```tsx
// ✅ CORRECT - Always include dark mode variants
<div className="bg-white dark:bg-dark-bg-secondary">
  <h2 className="text-gray-900 dark:text-white">Title</h2>
  <p className="text-gray-700 dark:text-gray-300">Content</p>
  <input className="border-gray-300 dark:border-gray-600" />
</div>

// ❌ WRONG - Missing dark mode
<div className="bg-white">
  <h2 className="text-gray-900">Title</h2>
</div>
```

#### 2. Form Element Styling

**All form elements must follow these patterns**:

**Input/Textarea/Select**:
```tsx
// Base classes pattern
const baseClasses = 'w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors'
```

**Checkbox**:
```tsx
// Base classes pattern
const baseClasses = 'w-4 h-4 rounded border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:ring-2 bg-white dark:bg-dark-bg-secondary checked:bg-primary-600 checked:border-primary-600 dark:checked:bg-primary-500 dark:checked:border-primary-500 accent-primary-600 dark:accent-primary-500 transition-colors cursor-pointer'
```

#### 3. Color Mapping Standards

**Text Colors** (must always include dark variants):
| Element | Light Mode | Dark Mode | Usage |
|---------|------------|-----------|-------|
| Primary Text | `text-gray-900` | `dark:text-white` | Headings, main content |
| Secondary Text | `text-gray-700` | `dark:text-gray-300` | Labels, descriptions |
| Muted Text | `text-gray-600` | `dark:text-gray-400` | Helper text, hints |
| Placeholder | `text-gray-500` | `dark:text-gray-400` | Input placeholders |
| Disabled | `text-gray-400` | `dark:text-gray-500` | Disabled elements |

**Background Colors** (must always include dark variants):
| Element | Light Mode | Dark Mode | Usage |
|---------|------------|-----------|-------|
| Primary Container | `bg-white` | `dark:bg-dark-bg-secondary` | Cards, panels |
| Secondary Container | `bg-gray-50` | `dark:bg-dark-bg` | Page backgrounds |
| Hover States | `hover:bg-gray-50` | `dark:hover:bg-gray-700` | Interactive elements |

**Border Colors** (must always include dark variants):
| Element | Light Mode | Dark Mode | Usage |
|---------|------------|-----------|-------|
| Standard Border | `border-gray-200` | `dark:border-gray-700` | Card borders |
| Input Border | `border-gray-300` | `dark:border-gray-600` | Form inputs |
| Focus Border | `focus:border-primary-500` | (same) | Focused inputs |

## Component Checklist

**⚠️ REMINDER: Update documentation FIRST before creating components.**

When creating a new form or updating existing forms:

- [ ] **Update documentation FIRST** - Document the component in `docs_unified/FRONTEND_DEVELOPMENT.md` before implementation
- [ ] Use `Input` component for text inputs
- [ ] Use `Textarea` component for multi-line text
- [ ] Use `Select` component for dropdowns
- [ ] Use `Button` component for all buttons
- [ ] Use `Modal` component for dialogs
- [ ] Use `Label` component when needed separately
- [ ] Pass error messages to components
- [ ] Test in both light and dark modes
- [ ] Verify accessibility (labels, ARIA attributes)
- [ ] Verify implementation matches documentation

## Examples

### Complete Form Example

```tsx
import { useForm } from 'react-hook-form'
import { Input, Textarea, Select, Button, Modal } from '../../common'

export default function UserForm({ user, onSave, onCancel }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: user
  })

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title={user ? 'Edit User' : 'Create User'}
      footer={
        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button type="submit" form="user-form">Save</Button>
        </div>
      }
    >
      <form id="user-form" onSubmit={handleSubmit(onSave)} className="space-y-6">
        <Input
          label="Username"
          required
          {...register('username', { required: 'Username is required' })}
          error={errors.username?.message}
        />

        <Input
          type="email"
          label="Email"
          required
          {...register('email', { required: 'Email is required' })}
          error={errors.email?.message}
        />

        <Select
          label="Status"
          {...register('status')}
          options={[
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' }
          ]}
        />

        <Textarea
          label="Notes"
          rows={4}
          {...register('notes')}
        />
      </form>
    </Modal>
  )
}
```

## Summary

The frontend follows a **strict component-based architecture** where:
- All form elements use reusable components
- No inline form field styles are allowed
- Components automatically support dark mode
- Consistent styling across the application
- Faster development with pre-built components
- Easier maintenance with single source of truth

This approach ensures consistency, maintainability, and efficient development across the entire application.

