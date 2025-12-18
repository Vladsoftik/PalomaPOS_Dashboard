# UI Design and Theme Requirements

## Overview

This document outlines universal UI design patterns, theme support, and styling requirements for React + Vite + TypeScript projects. Applications should support both Light and Dark themes with proper color contrast and visual hierarchy.

## Theme Support

### Theme Types

Applications should support two distinct UI themes:

1. **Light Theme** - Light mode with light backgrounds and dark text
2. **Dark Theme** - Dark mode with dark backgrounds and light text (Default)

### Theme Switching

- Users can switch between Light and Dark themes
- Theme preference should be saved (localStorage or user settings)
- Theme should persist across sessions
- Theme switching should be instant without page reload

## Dark Theme (Default)

### Color Palette

The Dark theme uses a specific color palette for branding and visual consistency:

#### Logo Colors

The logo in Dark theme may **only** use the following colors:

- **Blue**: `#34b7ff` - Primary brand color for logo elements
- **White**: `#ffffff` - Secondary logo color for text or highlights
- **Dark Blue Background**: `#061222` - Background color for dark theme

#### Dark Theme Color Specifications

| Element | Color | Hex Code | Usage |
|---------|-------|----------|-------|
| Background | Dark Blue | `#061222` | Primary background color |
| Logo Primary | Blue | `#34b7ff` | Logo main color |
| Logo Secondary | White | `#ffffff` | Logo text/highlights |
| Text Primary | White/Light | `#ffffff` or light gray | Primary text color |
| Text Secondary | Light Gray | `#9ca3af` or similar | Secondary text color |
| Accent | Blue | `#34b7ff` | Buttons, links, highlights |

### Dark Theme Requirements

1. **Default Theme**: Dark theme is the default theme for the application
2. **Logo Restrictions**: Logo colors are restricted to blue (`#34b7ff`), white (`#ffffff`), and dark blue background (`#061222`)
3. **Background**: Primary background uses dark blue (`#061222`)
4. **Contrast**: All text and UI elements must meet WCAG accessibility contrast requirements
5. **Consistency**: All components must support dark theme styling

## Light Theme

### Color Palette

The Light theme uses a standard light color palette:

#### Light Theme Color Specifications

| Element | Color | Usage |
|---------|-------|-------|
| Background | White/Light Gray | Primary background color |
| Text Primary | Dark Gray/Black | Primary text color |
| Text Secondary | Medium Gray | Secondary text color |
| Accent | Primary Blue | Buttons, links, highlights |
| Borders | Light Gray | Borders and dividers |

### Light Theme Requirements

1. **Theme Option**: Light theme is available as an alternative to dark theme
2. **Accessibility**: All text and UI elements must meet WCAG accessibility contrast requirements
3. **Consistency**: All components must support light theme styling
4. **Logo**: Logo should adapt appropriately for light theme (may use different colors than dark theme)

## Layout Patterns

### Sidebar Navigation

The main navigation sidebar supports collapse/expand functionality:

- **Collapsed State**: Sidebar collapses to show only icons (64px width)
- **Expanded State**: Sidebar shows icons and labels (256px width)
- **Toggle Button**: Chevron button to collapse (turn around) or expand (turn back)
- **State Persistence**: Collapsed/expanded state is saved to localStorage
- **Responsive**: On mobile, sidebar slides in/out; on desktop, it collapses/expands in place
- **Tooltips**: When collapsed, menu items show tooltips on hover

**Toggle Controls**:
- **Turn Around (Collapse)**: Click chevron left icon to collapse sidebar
- **Turn Back (Expand)**: Click chevron right icon to expand sidebar

## Text Color Standards

### Unified Text Color System

**All text elements must use unified dark mode styling throughout the entire project.** This ensures consistent readability and visual hierarchy in both light and dark themes.

#### Text Color Requirements

1. **All headings (h1-h6)** must include dark mode text colors:
   - Use `text-gray-900 dark:text-white` for primary headings
   - Or use the `Heading` component which includes automatic dark mode support

2. **All body text** must include dark mode variants:
   - Primary text: `text-gray-900 dark:text-white`
   - Secondary text: `text-gray-700 dark:text-gray-300`
   - Muted text: `text-gray-600 dark:text-gray-400`

3. **All labels** must include dark mode:
   - Labels: `text-gray-700 dark:text-gray-300`

4. **All containers** must include dark mode backgrounds:
   - Cards: `bg-white dark:bg-dark-bg-secondary`
   - Borders: `border-gray-200 dark:border-gray-700`

#### Text Color Mapping

| Element Type | Light Mode | Dark Mode | Component |
|--------------|------------|----------|-----------|
| Primary Heading | `text-gray-900` | `dark:text-white` | `Heading` component |
| Secondary Heading | `text-gray-900` | `dark:text-white` | `Heading` component |
| Primary Text | `text-gray-900` | `dark:text-white` | `Text variant="primary"` |
| Secondary Text | `text-gray-700` | `dark:text-gray-300` | `Text variant="secondary"` |
| Muted Text | `text-gray-600` | `dark:text-gray-400` | `Text variant="muted"` |
| Labels | `text-gray-700` | `dark:text-gray-300` | `Label` component |

#### Examples

**Correct Implementation**:
```tsx
// Using components
<Heading level={1}>Settings</Heading>
<Text variant="secondary">Manage services and hardware</Text>

// Using inline classes
<h1 className="text-gray-900 dark:text-white">Settings</h1>
<p className="text-gray-700 dark:text-gray-300">Manage services</p>
```

**Incorrect Implementation**:
```tsx
// Missing dark mode
<h1 className="text-gray-900">Settings</h1>
<p className="text-gray-700">Manage services</p>
```

## Component Theme Support

### Required Component Support

All UI components must support both themes:

1. **Layout Components**
   - Header/Navigation
   - Sidebar
   - Main content area
   - Footer (if applicable)

2. **Form Components**
   - Input fields
   - Buttons
   - Selects/Dropdowns
   - Checkboxes/Radio buttons
   - Text areas

3. **Data Display Components**
   - Tables
   - Cards
   - Lists
   - Statistics cards
   - Charts and graphs

4. **Navigation Components**
   - Menus
   - Breadcrumbs
   - Tabs
   - Pagination

5. **Feedback Components**
   - Alerts/Notifications
   - Modals/Dialogs
   - Tooltips
   - Loading states

### Theme Implementation

#### Tailwind CSS Dark Mode

Configure Tailwind CSS for dark mode:

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media'
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
}
```

## Logo Requirements

### Dark Theme Logo

In Dark theme, the logo must adhere to strict color restrictions:

- **Allowed Colors Only**:
  - Blue: `#34b7ff`
  - White: `#ffffff`
  - Dark Blue Background: `#061222`

- **Logo Variations**:
  - Full color logo (blue and white)
  - Monochrome logo (white only, for dark backgrounds)
  - Monochrome logo (blue only, for specific use cases)

### Light Theme Logo

In Light theme, the logo may use:
- Standard brand colors
- Colors appropriate for light backgrounds
- May differ from dark theme logo colors

## Accessibility Requirements

### Color Contrast

Both themes must meet WCAG 2.1 AA contrast requirements:

- **Normal Text**: Minimum 4.5:1 contrast ratio
- **Large Text**: Minimum 3:1 contrast ratio
- **UI Components**: Minimum 3:1 contrast ratio
- **Interactive Elements**: Clear visual feedback on hover/focus

### Visual Indicators

- Focus states must be clearly visible in both themes
- Hover states must provide clear feedback
- Disabled states must be distinguishable
- Error states must be clearly indicated

## Theme Implementation Guidelines

### Best Practices

1. **Consistent Color Usage**
   - Use theme variables consistently across all components
   - Avoid hardcoded colors
   - Test both themes during development

2. **Smooth Transitions**
   - Theme switching should be smooth
   - Consider transition animations for theme changes
   - Avoid jarring color changes

3. **Component Testing**
   - Test all components in both themes
   - Verify contrast ratios
   - Check interactive states (hover, focus, active)

4. **Logo Implementation**
   - Provide logo variants for both themes
   - Ensure logo visibility in both themes
   - Follow dark theme logo color restrictions

5. **User Preference**
   - Save user's theme preference
   - Respect system preference (optional)
   - Allow manual theme switching

## Theme Configuration

### Default Theme

- **Default**: Dark theme
- **Logo Colors (Dark)**: Blue (`#34b7ff`), White (`#ffffff`), Background (`#061222`)
- **Background (Dark)**: `#061222`

### Theme Storage

Theme preference should be stored:
- In localStorage (client-side)
- In user profile (server-side, optional)
- With fallback to system preference (optional)

## Examples

### Dark Theme Example

```
Background: #061222 (Dark Blue)
Text: #ffffff (White)
Accent: #34b7ff (Blue)
Logo: Blue (#34b7ff) and White (#ffffff)
```

### Light Theme Example

```
Background: #ffffff (White)
Text: #111827 (Dark Gray)
Accent: #0ea5e9 (Primary Blue)
Logo: Standard brand colors
```

## Summary

The UI design system provides:
- **Dual Theme Support**: Light and Dark themes
- **Dark Theme Default**: Dark theme is the default
- **Restricted Logo Colors**: Dark theme logo uses only blue (#34b7ff), white (#ffffff), and dark blue background (#061222)
- **Full Component Support**: All components support both themes
- **Accessibility**: WCAG compliant contrast ratios
- **Consistent Experience**: Unified design across all components and pages

