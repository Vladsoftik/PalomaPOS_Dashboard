# Styling Guidelines

## Overview

This document outlines universal styling guidelines, Tailwind CSS usage rules, dark mode requirements, and component styling patterns for React + Vite + TypeScript projects.

## Tailwind CSS Usage

### Core Principles

1. **Utility-First** - Use Tailwind utility classes instead of custom CSS
2. **Dark Mode Support** - All styles must include dark mode variants
3. **Component-Based** - Styles are encapsulated in reusable components
4. **Consistency** - Follow established patterns across the application

### Basic Usage

```tsx
// ✅ Good: Use Tailwind utilities
<div className="flex items-center justify-between p-4 bg-white dark:bg-dark-bg-secondary">
  <h2 className="text-gray-900 dark:text-white">Title</h2>
</div>

// ❌ Bad: Custom CSS classes
<div className="custom-container">
  <h2 className="custom-title">Title</h2>
</div>
```

## Dark Mode Implementation

### Dark Mode Strategy

Tailwind CSS uses `class` strategy for dark mode:

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ...
}
```

### Dark Mode Toggle

Apply `dark` class to root element (usually `<html>` or `<body>`) to enable dark mode:

```typescript
// Toggle dark mode
document.documentElement.classList.toggle('dark')
```

### Required Dark Mode Patterns

**All styles must include dark mode variants:**

```tsx
// ✅ Good: Includes dark mode
<div className="bg-white dark:bg-dark-bg-secondary">
  <h2 className="text-gray-900 dark:text-white">Title</h2>
  <p className="text-gray-700 dark:text-gray-300">Content</p>
</div>

// ❌ Bad: Missing dark mode
<div className="bg-white">
  <h2 className="text-gray-900">Title</h2>
</div>
```

## Text Color Requirements

### Text Color Mapping

| Element | Light Mode | Dark Mode | Usage |
|---------|------------|-----------|-------|
| Primary Heading | `text-gray-900` | `dark:text-white` | Main headings |
| Primary Text | `text-gray-900` | `dark:text-white` | Main content |
| Secondary Text | `text-gray-700` | `dark:text-gray-300` | Labels, descriptions |
| Muted Text | `text-gray-600` | `dark:text-gray-400` | Helper text |
| Placeholder | `text-gray-500` | `dark:text-gray-400` | Input placeholders |
| Disabled | `text-gray-400` | `dark:text-gray-500` | Disabled elements |

### Text Color Examples

```tsx
// ✅ Good: Primary text with dark mode
<p className="text-gray-900 dark:text-white">Main content</p>

// ✅ Good: Secondary text with dark mode
<p className="text-gray-700 dark:text-gray-300">Description</p>

// ✅ Good: Muted text with dark mode
<p className="text-gray-600 dark:text-gray-400">Helper text</p>

// ❌ Bad: Missing dark mode
<p className="text-gray-900">Main content</p>
```

## Background Color Requirements

### Background Color Mapping

| Element | Light Mode | Dark Mode | Usage |
|---------|------------|-----------|-------|
| Primary Container | `bg-white` | `dark:bg-dark-bg-secondary` | Cards, panels |
| Secondary Container | `bg-gray-50` | `dark:bg-dark-bg` | Page backgrounds |
| Hover State | `hover:bg-gray-50` | `dark:hover:bg-gray-700` | Interactive elements |

### Background Color Examples

```tsx
// ✅ Good: Card with dark mode
<div className="bg-white dark:bg-dark-bg-secondary rounded-lg p-4">
  {/* Content */}
</div>

// ✅ Good: Page background with dark mode
<div className="bg-gray-50 dark:bg-dark-bg min-h-screen">
  {/* Content */}
</div>

// ❌ Bad: Missing dark mode
<div className="bg-white rounded-lg p-4">
  {/* Content */}
</div>
```

## Border Color Requirements

### Border Color Mapping

| Element | Light Mode | Dark Mode | Usage |
|---------|------------|-----------|-------|
| Standard Border | `border-gray-200` | `dark:border-gray-700` | Card borders |
| Input Border | `border-gray-300` | `dark:border-gray-600` | Form inputs |
| Focus Border | `focus:border-primary-500` | (same) | Focused inputs |

### Border Color Examples

```tsx
// ✅ Good: Card border with dark mode
<div className="border border-gray-200 dark:border-gray-700 rounded-lg">
  {/* Content */}
</div>

// ✅ Good: Input border with dark mode
<input className="border border-gray-300 dark:border-gray-600 rounded-lg" />

// ❌ Bad: Missing dark mode
<div className="border border-gray-200 rounded-lg">
  {/* Content */}
</div>
```

## Form Element Styling

### Input/Textarea/Select Base Classes

**Standard pattern for form elements:**

```tsx
const baseClasses = 'w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors'
```

### Checkbox Base Classes

**Standard pattern for checkboxes:**

```tsx
const baseClasses = 'w-4 h-4 rounded border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:ring-2 bg-white dark:bg-dark-bg-secondary checked:bg-primary-600 checked:border-primary-600 dark:checked:bg-primary-500 dark:checked:border-primary-500 accent-primary-600 dark:accent-primary-500 transition-colors cursor-pointer'
```

**Important Checkbox Rules**:
- ❌ **NEVER** use `text-primary-600` on checkbox inputs (text color doesn't apply to checkboxes)
- ✅ **ALWAYS** include `dark:checked:bg-primary-500` and `dark:checked:border-primary-500` for checked state in dark mode
- ✅ **ALWAYS** include `dark:accent-primary-500` for browser-specific accent color support

### Form Element Examples

```tsx
// ✅ Good: Input with all required classes
<input
  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
/>

// ✅ Good: Checkbox with dark mode checked state
<input
  type="checkbox"
  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 checked:bg-primary-600 checked:border-primary-600 dark:checked:bg-primary-500 dark:checked:border-primary-500"
/>

// ❌ Bad: Missing dark mode variants
<input
  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
/>
```

## Spacing and Sizing

### Spacing Scale

Use Tailwind's spacing scale consistently:

- `p-4` - Padding (1rem)
- `m-4` - Margin (1rem)
- `gap-4` - Gap (1rem)
- `space-y-4` - Vertical spacing (1rem)

### Common Spacing Patterns

```tsx
// ✅ Good: Consistent spacing
<div className="p-4 space-y-4">
  <h2 className="mb-2">Title</h2>
  <p>Content</p>
</div>

// ✅ Good: Flexbox with gap
<div className="flex items-center gap-4">
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</div>
```

## Responsive Design

### Breakpoints

Tailwind's default breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Responsive Patterns

```tsx
// ✅ Good: Responsive layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content */}
</div>

// ✅ Good: Responsive text
<h1 className="text-2xl md:text-3xl lg:text-4xl">Title</h1>

// ✅ Good: Responsive padding
<div className="p-4 md:p-6 lg:p-8">
  {/* Content */}
</div>
```

## Custom Colors

### Dark Theme Colors

Defined in `tailwind.config.js`:

```javascript
colors: {
  dark: {
    bg: '#061222',
    'bg-secondary': '#0a1a2e',
  },
  logo: {
    blue: '#34b7ff',
    white: '#ffffff',
  },
}
```

### Usage

```tsx
// ✅ Good: Use custom colors
<div className="bg-dark-bg dark:bg-dark-bg-secondary">
  <div className="text-logo-blue">Logo</div>
</div>
```

## Component Styling Patterns

### Reusable Component Styling

Components handle their own styling internally:

```tsx
// ✅ Good: Component encapsulates styling
<Input
  label="Email"
  className="mb-4" // Additional classes if needed
  {...register('email')}
/>

// ❌ Bad: Inline styles in usage
<input
  className="w-full px-4 py-2 border border-gray-300..."
  {...register('email')}
/>
```

### Customization

Components accept `className` prop for additional styling:

```tsx
<Button className="w-full md:w-auto">Submit</Button>
<Input className="mb-4" label="Email" />
```

## State-Specific Styling

### Hover States

```tsx
// ✅ Good: Hover with dark mode
<button className="hover:bg-gray-50 dark:hover:bg-gray-700">
  Hover me
</button>
```

### Focus States

```tsx
// ✅ Good: Focus ring
<input className="focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
```

### Active States

```tsx
// ✅ Good: Active state
<button className="active:bg-gray-100 dark:active:bg-gray-600">
  Click me
</button>
```

### Disabled States

```tsx
// ✅ Good: Disabled state
<button className="disabled:opacity-50 disabled:cursor-not-allowed">
  Disabled
</button>
```

## Common Mistakes to Avoid

### ❌ DON'T

1. **Missing Dark Mode Variants**
   ```tsx
   <div className="bg-white text-gray-900">
     {/* Missing dark mode */}
   </div>
   ```

2. **Hardcoded Colors**
   ```tsx
   <div style={{ backgroundColor: '#ffffff' }}>
     {/* Use Tailwind classes instead */}
   </div>
   ```

3. **Inline Styles for Form Fields**
   ```tsx
   <input className="w-full px-4 py-2 border..." />
   {/* Use reusable Input component instead */}
   ```

4. **Inconsistent Spacing**
   ```tsx
   <div className="p-3">
     {/* Use standard spacing scale */}
   </div>
   ```

### ✅ DO

1. **Always Include Dark Mode**
   ```tsx
   <div className="bg-white dark:bg-dark-bg-secondary">
     <h2 className="text-gray-900 dark:text-white">Title</h2>
   </div>
   ```

2. **Use Tailwind Utilities**
   ```tsx
   <div className="flex items-center justify-between p-4">
     {/* Use Tailwind classes */}
   </div>
   ```

3. **Use Reusable Components**
   ```tsx
   <Input label="Email" {...register('email')} />
   ```

4. **Follow Spacing Scale**
   ```tsx
   <div className="p-4 space-y-4">
     {/* Use standard spacing */}
   </div>
   ```

## Testing Checklist

Before committing code, verify:

- [ ] All text elements have dark mode variants (`dark:text-*`)
- [ ] All containers have dark mode backgrounds (`dark:bg-*`)
- [ ] All borders have dark mode variants (`dark:border-*`)
- [ ] Checkboxes work correctly in both themes (checked state visible)
- [ ] Form inputs have proper focus states in both themes
- [ ] Hover states work in both themes
- [ ] No hardcoded colors without dark variants
- [ ] All components use reusable components (no inline form styles)
- [ ] Error states are visible in both themes
- [ ] Disabled states are visible in both themes

## Summary

Styling guidelines ensure:

- **Consistency** - Uniform styling across the application
- **Dark Mode Support** - All elements support both themes
- **Maintainability** - Component-based styling approach
- **Accessibility** - Proper contrast and focus states
- **Responsiveness** - Mobile-first responsive design

