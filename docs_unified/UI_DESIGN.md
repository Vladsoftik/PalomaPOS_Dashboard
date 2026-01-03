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

## Core Color System

This section defines the complete color system using CSS variables (custom properties) that support both light and dark themes. All colors are defined using HSL values for better theme switching and consistency.

### 1. Background Colors

#### `--background` / `bg-background`

**Purpose**: Main page background

**Light Mode:**
- HSL: `hsl(0 0% 100%)`
- Hex: `#ffffff`
- Usage: Main page background, body background

**Dark Mode:**
- HSL: `hsl(214 70% 8%)`
- Hex: `#061222`
- Usage: Main page background in dark mode

**Where Used:**
- `<body>` element
- Main content areas
- Page containers

#### `--foreground` / `text-foreground`

**Purpose**: Primary text color

**Light Mode:**
- HSL: `hsl(222.2 84% 4.9%)`
- Hex: `#0a0f1a` (approximate)
- Usage: Default text color, body text, headings (when not overridden)

**Dark Mode:**
- HSL: `hsl(0 0% 100%)`
- Hex: `#ffffff`
- Usage: Default text color, body text, headings

**Where Used:**
- Default text color
- Body text
- Headings (when not overridden)

### 2. Card Colors

#### `--card` / `bg-card`

**Purpose**: Card, dialog, drawer, and header backgrounds

**Light Mode:**
- HSL: `hsl(0 0% 100%)`
- Hex: `#ffffff`

**Dark Mode:**
- HSL: `hsl(213 64% 11%)`
- Hex: `#0a1a2e` (dark-bg-secondary)

**Where Used:**
- Card components (Card, CardHeader, CardContent)
- Dialog backgrounds
- Drawer backgrounds
- Header backgrounds (dark mode)
- Popover backgrounds

**Example:**
```tsx
<Card className="bg-card">...</Card>  // Or in dark mode: dark:bg-dark-bg-secondary
```

#### `--card-foreground` / `text-card-foreground`

**Purpose**: Text color on card backgrounds

**Light Mode:**
- HSL: `hsl(222.2 84% 4.9%)`

**Dark Mode:**
- HSL: `hsl(0 0% 100%)`

**Where Used:**
- Text inside cards
- Card titles and descriptions

### 3. Primary Colors

#### `--primary` / `bg-primary`, `text-primary`

**Purpose**: Brand color (logo blue)

**Both Modes:**
- HSL: `hsl(201 100% 60%)`
- Hex: `#34b7ff`

**Where Used:**
- Primary buttons
- Active navigation items
- Links
- Brand elements
- Focus rings
- Sidebar active states

**Example:**
```tsx
<Button className="bg-primary text-primary-foreground">Click</Button>
```

#### `--primary-foreground` / `text-primary-foreground`

**Purpose**: Text color on primary backgrounds

**Light Mode:**
- HSL: `hsl(255 255 255)` (white)
- Hex: `#ffffff`

**Dark Mode:**
- HSL: `hsl(214 70% 8%)`
- Hex: `#061222`

**Where Used:**
- Text on primary buttons
- Text on primary-colored backgrounds

### 4. Secondary Colors

#### `--secondary` / `bg-secondary`

**Purpose**: Secondary UI elements

**Light Mode:**
- HSL: `hsl(210 40% 96.1%)`
- Hex: `#f4f6f8` (approximate)

**Dark Mode:**
- HSL: `hsl(214 40% 15%)`
- Hex: `#1f2937` (approximate)

**Where Used:**
- Secondary buttons
- Secondary backgrounds
- Less prominent UI elements

#### `--secondary-foreground` / `text-secondary-foreground`

**Purpose**: Text on secondary backgrounds

**Light Mode:**
- HSL: `hsl(222.2 47.4% 11.2%)`

**Dark Mode:**
- HSL: `hsl(0 0% 100%)`

**Where Used:**
- Text on secondary buttons
- Text on secondary backgrounds

### 5. Muted Colors

#### `--muted` / `bg-muted`

**Purpose**: Subtle backgrounds for less prominent elements

**Light Mode:**
- HSL: `hsl(210 40% 96.1%)`
- Hex: `#f4f6f8` (approximate)

**Dark Mode:**
- HSL: `hsl(214 30% 18%)`
- Hex: `#2a3441` (approximate)

**Where Used:**
- Table headers (bg-muted)
- Subtle backgrounds
- Hover states (hover:bg-muted/50)
- Section backgrounds
- Transaction card backgrounds

**Example:**
```tsx
<div className="bg-muted/50">Subtle background</div>
<thead className="bg-muted">Table header</thead>
```

#### `--muted-foreground` / `text-muted-foreground`

**Purpose**: Less prominent text

**Light Mode:**
- HSL: `hsl(215.4 16.3% 46.9%)`
- Hex: `#6b7280` (approximate)

**Dark Mode:**
- HSL: `hsl(0 0% 65%)`
- Hex: `#a6a6a6` (approximate)

**Where Used:**
- Secondary text
- Descriptions
- Helper text
- Placeholder-like text
- Icons in less prominent contexts

**Example:**
```tsx
<p className="text-muted-foreground">Helper text</p>
<Info className="text-muted-foreground" />
```

### 6. Accent Colors

#### `--accent` / `bg-accent`

**Purpose**: Highlights and hover states

**Light Mode:**
- HSL: `hsl(210 40% 94%)`
- Hex: `#eef2f6` (approximate)

**Dark Mode:**
- HSL: `hsl(214 35% 20%)`
- Hex: `#374151` (approximate)

**Where Used:**
- Hover states (hover:bg-accent)
- Ghost buttons
- Outline button hover states
- Interactive element highlights

#### `--accent-foreground` / `text-accent-foreground`

**Purpose**: Text on accent backgrounds

**Light Mode:**
- HSL: `hsl(222.2 47.4% 11.2%)`

**Dark Mode:**
- HSL: `hsl(0 0% 100%)`

**Where Used:**
- Text on hover states
- Text on accent backgrounds

### 7. Destructive Colors

#### `--destructive` / `bg-destructive`

**Purpose**: Error states, delete actions, warnings

**Light Mode:**
- HSL: `hsl(0 84.2% 60.2%)`
- Hex: `#ef4444` (approximate)

**Dark Mode:**
- HSL: `hsl(0 84% 60%)`
- Hex: `#ef4444` (approximate)

**Where Used:**
- Destructive buttons
- Error messages
- Delete actions
- Warning indicators

#### `--destructive-foreground` / `text-destructive-foreground`

**Purpose**: Text on destructive backgrounds

**Light Mode:**
- HSL: `hsl(210 40% 98%)`

**Dark Mode:**
- HSL: `hsl(0 0% 100%)`

**Where Used:**
- Text on destructive buttons
- Text on error backgrounds

### 8. Border & Input Colors

#### `--border` / `border-border`

**Purpose**: Borders and dividers

**Light Mode:**
- HSL: `hsl(214.3 31.8% 91.4%)`
- Hex: `#e5e7eb` (approximate)

**Dark Mode:**
- HSL: `hsl(214 30% 20%)`
- Hex: `#374151` (approximate)

**Where Used:**
- Card borders (border-border)
- Input borders
- Table borders
- Dividers
- Sidebar borders

**Example:**
```tsx
<div className="border border-border">...</div>
```

#### `--input` / `border-input`

**Purpose**: Input field borders

**Light Mode:**
- HSL: `hsl(214.3 31.8% 91.4%)`

**Dark Mode:**
- HSL: `hsl(214 30% 20%)`

**Where Used:**
- Input fields
- Textarea borders
- Select borders

#### `--ring` / `ring-ring`

**Purpose**: Focus ring color

**Both Modes:**
- HSL: `hsl(201 100% 60%)`
- Hex: `#34b7ff`

**Where Used:**
- Focus states (focus-visible:ring-ring)
- Input focus rings
- Button focus rings

### 9. Popover Colors

#### `--popover` / `bg-popover`

**Purpose**: Popover and dropdown backgrounds

**Light Mode:**
- HSL: `hsl(0 0% 100%)`
- Hex: `#ffffff`

**Dark Mode:**
- HSL: `hsl(213 64% 11%)`
- Hex: `#0a1a2e`

**Where Used:**
- Popover components
- Dropdown menus
- Tooltip backgrounds
- Chart tooltips

#### `--popover-foreground` / `text-popover-foreground`

**Purpose**: Text in popovers

**Light Mode:**
- HSL: `hsl(222.2 84% 4.9%)`

**Dark Mode:**
- HSL: `hsl(0 0% 100%)`

**Where Used:**
- Text inside popovers
- Dropdown menu text

### 10. Sidebar Colors

#### `--sidebar-background` / `bg-sidebar`

**Purpose**: Sidebar background

**Light Mode:**
- HSL: `hsl(0 0% 100%)`
- Hex: `#ffffff`

**Dark Mode:**
- HSL: `hsl(213 64% 11%)`
- Hex: `#0a1a2e`

**Where Used:**
- Sidebar component (`<aside>`)
- Navigation sidebar

**Example:**
```tsx
<aside className="bg-sidebar border-r border-sidebar-border">...</aside>
```

#### `--sidebar-foreground` / `text-sidebar-foreground`

**Purpose**: Text in sidebar

**Light Mode:**
- HSL: `hsl(222.2 47.4% 11.2%)`

**Dark Mode:**
- HSL: `hsl(0 0% 100%)`

**Where Used:**
- Sidebar navigation text
- Sidebar titles
- Sidebar icons

#### `--sidebar-primary` / `bg-sidebar-primary`, `text-sidebar-primary`

**Purpose**: Active state in sidebar

**Both Modes:**
- HSL: `hsl(201 100% 60%)`
- Hex: `#34b7ff`

**Where Used:**
- Active navigation items
- Selected sidebar items

#### `--sidebar-accent` / `bg-sidebar-accent`

**Purpose**: Hover states in sidebar

**Light Mode:**
- HSL: `hsl(201 100% 95%)`
- Hex: `#e6f7ff` (approximate)

**Dark Mode:**
- HSL: `hsl(201 100% 15%)`
- Hex: `#0d1a26` (approximate)

**Where Used:**
- Sidebar item hover states
- Sidebar item highlights

#### `--sidebar-border` / `border-sidebar-border`

**Purpose**: Sidebar borders

**Light Mode:**
- HSL: `hsl(220 13% 91%)`
- Hex: `#e5e7eb` (approximate)

**Dark Mode:**
- HSL: `hsl(214 30% 20%)`
- Hex: `#374151` (approximate)

**Where Used:**
- Sidebar right border
- Sidebar dividers

#### `--sidebar-ring` / `ring-sidebar-ring`

**Purpose**: Focus ring in sidebar

**Both Modes:**
- HSL: `hsl(201 100% 60%)`
- Hex: `#34b7ff`

**Where Used:**
- Sidebar item focus states

### Additional Color Palette

#### Logo Colors

- **logo-blue**: `#34b7ff` (same as primary)
- **logo-white**: `#ffffff`

#### Dark Theme Specific Colors (Tailwind Config)

- **dark-bg**: `#061222` (main dark background)
- **dark-bg-secondary**: `#0a1a2e` (cards, dialogs, sidebars)

#### Indigo Palette

Indigo palette (indigo-50 through indigo-950) is available but not primary.

### Usage Patterns

#### Common Patterns

**Cards:**
```tsx
<Card className="bg-card border border-border">
  <CardHeader>
    <CardTitle className="text-card-foreground">Title</CardTitle>
  </CardHeader>
</Card>
```

**Buttons:**
```tsx
<Button className="bg-primary text-primary-foreground">Primary</Button>
<Button variant="secondary" className="bg-secondary text-secondary-foreground">Secondary</Button>
<Button variant="ghost" className="hover:bg-accent hover:text-accent-foreground">Ghost</Button>
```

**Sidebar:**
```tsx
<aside className="bg-sidebar border-r border-sidebar-border">
  <nav className="text-sidebar-foreground">...</nav>
</aside>
```

**Tables:**
```tsx
<thead className="bg-muted">
  <tr className="border-b border-border">...</tr>
</thead>
```

**Text Hierarchy:**
```tsx
<h1 className="text-foreground">Main Heading</h1>
<p className="text-muted-foreground">Secondary text</p>
```

### Implementation Guide for Another App

#### Step 1: Add CSS Variables

Copy the `:root` and `.dark` sections from `src/index.css` to your CSS file.

#### Step 2: Configure Tailwind

Add the color configuration from `tailwind.config.ts` to your Tailwind config.

#### Step 3: Use Classes

Use Tailwind classes like `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, etc.

#### Step 4: Theme Toggle

Implement a theme toggle that adds/removes the `dark` class on the root element.

### Color Conversion Reference

To convert HSL to RGB/Hex:

- HSL format: `hsl(214 70% 8%)` (space-separated, no commas)
- Use online converters or CSS `hsl()` function
- Example: `hsl(214, 70%, 8%)` = `rgb(6, 18, 34)` = `#061222`

**Note**: This palette supports light and dark modes with consistent brand colors.

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

## Icon Requirements

### Mandatory Icon Library

**Lucide React is the mandatory and exclusive icon library for the entire project.** All icons throughout the application must use Lucide React icons. No other icon libraries (Font Awesome, Heroicons, Material Icons, etc.) are permitted.

### Installation

Install Lucide React as a project dependency:

```bash
npm install lucide-react
# or
yarn add lucide-react
# or
pnpm add lucide-react
```

### Import Pattern

Always import icons individually from `lucide-react`:

```tsx
// ✅ Correct - Individual imports
import { Search, User, Settings, ChevronRight, X } from 'lucide-react'

// ❌ Incorrect - Do not import entire library
import * as Icons from 'lucide-react'
```

### Usage Guidelines

#### Basic Icon Usage

```tsx
import { Search } from 'lucide-react'

// Basic icon
<Search className="w-5 h-5" />

// Icon with color
<Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />

// Icon in button
<button className="flex items-center gap-2">
  <Search className="w-5 h-5" />
  Search
</button>
```

#### Icon Sizing

Use consistent icon sizes throughout the application:

| Size | Tailwind Class | Pixels | Usage |
|------|----------------|--------|-------|
| Extra Small | `w-3 h-3` | 12px | Tiny indicators, inline badges |
| Small | `w-4 h-4` | 16px | Small buttons, compact spaces |
| Medium | `w-5 h-5` | 20px | Standard buttons, inputs, navigation (default) |
| Large | `w-6 h-6` | 24px | Headers, prominent actions |
| Extra Large | `w-8 h-8` | 32px | Hero sections, large CTAs |

**Default Size**: Always use `w-5 h-5` (20px) unless a specific size is required.

#### Icon Colors

Icons must follow the color specifications defined in the Component Color Specifications section. Icons inherit text color by default and should use theme-aware classes:

```tsx
// ✅ Correct - Theme-aware icon colors
<Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
<User className="w-5 h-5 text-primary-500" />
<X className="w-5 h-5 text-gray-500 dark:text-gray-400" />

// ❌ Incorrect - Hardcoded colors
<Search className="w-5 h-5 text-gray-600" />
```

#### Icon States

Icons must support all interactive states (hover, active, focus, disabled):

```tsx
// Icon in button with states
<button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:text-primary-500 disabled:text-gray-400 dark:disabled:text-gray-600">
  <Settings className="w-5 h-5" />
</button>
```

### Common Icon Usage Patterns

#### Navigation Icons

```tsx
import { 
  LayoutDashboard, 
  Clock, 
  ShoppingBag, 
  Brain, 
  Gift, 
  Globe, 
  Zap 
} from 'lucide-react'

// Sidebar navigation
<LayoutDashboard className="w-5 h-5" />
<Clock className="w-5 h-5" />
<ShoppingBag className="w-5 h-5" />
```

#### Action Icons

```tsx
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Check, 
  Search, 
  Filter 
} from 'lucide-react'

// Common actions
<Plus className="w-5 h-5" /> // Add
<Edit className="w-5 h-5" /> // Edit
<Trash2 className="w-5 h-5" /> // Delete
<Save className="w-5 h-5" /> // Save
<X className="w-5 h-5" /> // Close/Cancel
<Check className="w-5 h-5" /> // Confirm
<Search className="w-5 h-5" /> // Search
<Filter className="w-5 h-5" /> // Filter
```

#### Status Icons

```tsx
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Info, 
  AlertTriangle 
} from 'lucide-react'

// Status indicators
<CheckCircle className="w-5 h-5 text-green-500" /> // Success
<XCircle className="w-5 h-5 text-red-500" /> // Error
<AlertCircle className="w-5 h-5 text-yellow-500" /> // Warning
<Info className="w-5 h-5 text-blue-500" /> // Info
```

#### Directional Icons

```tsx
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp, 
  ChevronDown, 
  ArrowLeft, 
  ArrowRight 
} from 'lucide-react'

// Navigation and direction
<ChevronLeft className="w-5 h-5" />
<ChevronRight className="w-5 h-5" />
<ChevronUp className="w-5 h-5" />
<ChevronDown className="w-5 h-5" />
```

### Icon Component Pattern

For reusable icon usage, create a wrapper component:

```tsx
// components/common/Icon.tsx
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils' // or your className utility

interface IconProps {
  icon: LucideIcon
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
}

export default function Icon({ 
  icon: IconComponent, 
  size = 'md', 
  className 
}: IconProps) {
  return (
    <IconComponent 
      className={cn(sizeClasses[size], className)} 
    />
  )
}

// Usage
import Icon from '@/components/common/Icon'
import { Search } from 'lucide-react'

<Icon icon={Search} size="md" className="text-gray-600 dark:text-gray-400" />
```

### Icon Accessibility

All icons must be accessible:

```tsx
// ✅ Correct - Icon with aria-label
<button aria-label="Search">
  <Search className="w-5 h-5" />
</button>

// ✅ Correct - Icon with visible text
<button>
  <Search className="w-5 h-5" />
  <span>Search</span>
</button>

// ✅ Correct - Decorative icon with aria-hidden
<div>
  <span>Total Sales</span>
  <TrendingUp className="w-5 h-5" aria-hidden="true" />
</div>
```

### Icon Color Integration

Icons must follow the color specifications defined in each component section:

- **Sidebar Icons**: Use colors from Sidebar Component specifications
- **Button Icons**: Use colors from Button Component specifications
- **Input Icons**: Use colors from Input Component specifications
- **Header Icons**: Use colors from Header Component specifications

Refer to the Component Color Specifications section for detailed icon color requirements for each component.

### Prohibited Practices

**DO NOT:**
- Use other icon libraries (Font Awesome, Heroicons, Material Icons, etc.)
- Import the entire Lucide React library
- Use SVG files for icons (use Lucide React components instead)
- Hardcode icon colors without dark mode variants
- Use icons without proper sizing classes
- Skip accessibility attributes for icon-only buttons

**DO:**
- Always import icons individually from `lucide-react`
- Use consistent sizing (default: `w-5 h-5`)
- Apply theme-aware color classes
- Include accessibility attributes
- Follow component-specific icon color specifications
- Use semantic icon choices (e.g., `Trash2` for delete, not `X`)

### Icon Documentation

For the complete list of available icons, visit:
- **Lucide Icons**: https://lucide.dev/icons/
- **Lucide React**: https://lucide.dev/guide/packages/lucide-react

Browse icons by category (Actions, Communication, Layout, etc.) and search by name.

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

## Component Color Specifications

This section provides detailed color specifications for every UI component to ensure consistent design across the entire application. All components support both Light and Dark themes with complete state definitions.

### Sidebar Component

The sidebar provides main navigation with collapse/expand functionality.

#### Light Theme

| Element | State | Background | Text | Border | Icon | Hex Codes |
|---------|-------|------------|------|--------|------|-----------|
| Container | Default | White | - | Gray-200 | - | `#ffffff` / `#e5e7eb` |
| Menu Item | Default | Transparent | Gray-700 | - | Gray-600 | `#374151` / `#4b5563` |
| Menu Item | Hover | Gray-100 | Gray-900 | - | Gray-700 | `#f3f4f6` / `#111827` / `#374151` |
| Menu Item | Active | Primary-500 | White | - | White | `#34b7ff` / `#ffffff` |
| Menu Item | Focus | Gray-50 | Gray-900 | Primary-500 (ring) | Gray-700 | `#f9fafb` / `#111827` / `#34b7ff` |
| Menu Item | Disabled | Transparent | Gray-400 | - | Gray-400 | `#9ca3af` |
| Sub-item | Default | Transparent | Gray-600 | - | Gray-500 | `#4b5563` / `#6b7280` |
| Sub-item | Active | Primary-500 | White | - | White | `#34b7ff` / `#ffffff` |
| Toggle Button | Default | Transparent | Gray-700 | - | Gray-600 | `#374151` / `#4b5563` |
| Toggle Button | Hover | Gray-100 | Gray-900 | - | Gray-700 | `#f3f4f6` / `#111827` / `#374151` |

#### Dark Theme

| Element | State | Background | Text | Border | Icon | Hex Codes |
|---------|-------|------------|------|--------|------|-----------|
| Container | Default | Dark-bg-secondary | - | Gray-700 | - | `#0a1a2e` / `#374151` |
| Menu Item | Default | Transparent | Gray-300 | - | Gray-400 | `#d1d5db` / `#9ca3af` |
| Menu Item | Hover | Gray-700 | White | - | Gray-300 | `#374151` / `#ffffff` / `#d1d5db` |
| Menu Item | Active | Primary-500 | White | - | White | `#34b7ff` / `#ffffff` |
| Menu Item | Focus | Gray-800 | White | Primary-500 (ring) | Gray-300 | `#1f2937` / `#ffffff` / `#34b7ff` |
| Menu Item | Disabled | Transparent | Gray-600 | - | Gray-600 | `#4b5563` |
| Sub-item | Default | Transparent | Gray-400 | - | Gray-500 | `#9ca3af` / `#6b7280` |
| Sub-item | Active | Primary-500 | White | - | White | `#34b7ff` / `#ffffff` |
| Toggle Button | Default | Transparent | Gray-300 | - | Gray-400 | `#d1d5db` / `#9ca3af` |
| Toggle Button | Hover | Gray-700 | White | - | Gray-300 | `#374151` / `#ffffff` / `#d1d5db` |

#### Tailwind Classes

```tsx
// Container
className="bg-white dark:bg-dark-bg-secondary border-r border-gray-200 dark:border-gray-700"

// Menu Item - Default
className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"

// Menu Item - Active
className="bg-primary-500 text-white"

// Menu Item - Focus
className="focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg-secondary"

// Menu Item - Disabled
className="disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed"**WCAG Compliance**: All text meets 4.5:1 contrast ratio. Active state uses primary blue with white text (4.8:1).

### Header Component

The header provides top navigation, user actions, and branding.

#### Light Theme

| Element | State | Background | Text | Border | Icon | Hex Codes |
|---------|-------|------------|------|--------|------|-----------|
| Container | Default | White | - | Gray-200 | - | `#ffffff` / `#e5e7eb` |
| Logo Area | Default | Transparent | - | - | Primary-500 | `#34b7ff` |
| Navigation Item | Default | Transparent | Gray-700 | - | Gray-600 | `#374151` / `#4b5563` |
| Navigation Item | Hover | Gray-100 | Gray-900 | - | Gray-700 | `#f3f4f6` / `#111827` / `#374151` |
| Navigation Item | Active | Gray-100 | Primary-500 | Primary-500 (bottom) | Primary-500 | `#f3f4f6` / `#34b7ff` |
| Action Button | Default | Transparent | Gray-700 | Gray-200 | Gray-600 | `#374151` / `#e5e7eb` / `#4b5563` |
| Action Button | Hover | Gray-100 | Gray-900 | Gray-300 | Gray-700 | `#f3f4f6` / `#111827` / `#d1d5db` |
| Search Bar | Default | Gray-50 | Gray-900 | Gray-200 | Gray-500 | `#f9fafb` / `#111827` / `#e5e7eb` / `#6b7280` |
| Search Bar | Focus | White | Gray-900 | Primary-500 | Primary-500 | `#ffffff` / `#111827` / `#34b7ff` |
| User Menu | Default | Transparent | Gray-700 | - | Gray-600 | `#374151` / `#4b5563` |
| User Menu | Hover | Gray-100 | Gray-900 | - | Gray-700 | `#f3f4f6` / `#111827` / `#374151` |
| Notification Badge | Default | Red-500 | White | - | - | `#ef4444` / `#ffffff` |
| Notification Badge | Count | Red-600 | White | - | - | `#dc2626` / `#ffffff` |

#### Dark Theme

| Element | State | Background | Text | Border | Icon | Hex Codes |
|---------|-------|------------|------|--------|------|-----------|
| Container | Default | Dark-bg-secondary | - | Gray-700 | - | `#0a1a2e` / `#374151` |
| Logo Area | Default | Transparent | - | - | Primary-500 | `#34b7ff` |
| Navigation Item | Default | Transparent | Gray-300 | - | Gray-400 | `#d1d5db` / `#9ca3af` |
| Navigation Item | Hover | Gray-700 | White | - | Gray-300 | `#374151` / `#ffffff` / `#d1d5db` |
| Navigation Item | Active | Gray-800 | Primary-500 | Primary-500 (bottom) | Primary-500 | `#1f2937` / `#34b7ff` |
| Action Button | Default | Transparent | Gray-300 | Gray-700 | Gray-400 | `#d1d5db` / `#374151` / `#9ca3af` |
| Action Button | Hover | Gray-700 | White | Gray-600 | Gray-300 | `#374151` / `#ffffff` / `#4b5563` |
| Search Bar | Default | Gray-800 | White | Gray-700 | Gray-500 | `#1f2937` / `#ffffff` / `#374151` / `#6b7280` |
| Search Bar | Focus | Gray-700 | White | Primary-500 | Primary-500 | `#374151` / `#ffffff` / `#34b7ff` |
| User Menu | Default | Transparent | Gray-300 | - | Gray-400 | `#d1d5db` / `#9ca3af` |
| User Menu | Hover | Gray-700 | White | - | Gray-300 | `#374151` / `#ffffff` / `#d1d5db` |
| Notification Badge | Default | Red-500 | White | - | - | `#ef4444` / `#ffffff` |
| Notification Badge | Count | Red-600 | White | - | - | `#dc2626` / `#ffffff` |

#### Tailwind Classes

```tsx
// Container
className="bg-white dark:bg-dark-bg-secondary border-b border-gray-200 dark:border-gray-700"

// Navigation Item - Default
className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"

// Navigation Item - Active
className="bg-gray-100 dark:bg-gray-800 text-primary-500 border-b-2 border-primary-500"

// Search Bar
className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500"

// Notification Badge
className="bg-red-500 text-white text-xs font-semibold rounded-full"**WCAG Compliance**: All text meets 4.5:1 contrast ratio. Notification badges use red-500/red-600 with white text (4.5:1).

### Card Component

Cards are used for displaying content in contained sections.

#### Light Theme

| Element | State | Background | Text | Border | Shadow | Hex Codes |
|---------|-------|------------|------|--------|--------|-----------|
| Container | Default | White | - | Gray-200 | Sm | `#ffffff` / `#e5e7eb` |
| Container | Hover | White | - | Gray-300 | Md | `#ffffff` / `#d1d5db` |
| Header | Default | Gray-50 | Gray-900 | Gray-200 (bottom) | - | `#f9fafb` / `#111827` / `#e5e7eb` |
| Body | Default | White | Gray-900 | - | - | `#ffffff` / `#111827` |
| Footer | Default | Gray-50 | Gray-700 | Gray-200 (top) | - | `#f9fafb` / `#374151` / `#e5e7eb` |
| Title | Default | Transparent | Gray-900 | - | - | `#111827` |
| Subtitle | Default | Transparent | Gray-600 | - | - | `#4b5563` |
| Content | Default | Transparent | Gray-700 | - | - | `#374151` |

#### Dark Theme

| Element | State | Background | Text | Border | Shadow | Hex Codes |
|---------|-------|------------|------|--------|--------|-----------|
| Container | Default | Dark-bg-secondary | - | Gray-700 | Sm | `#0a1a2e` / `#374151` |
| Container | Hover | Dark-bg-secondary | - | Gray-600 | Md | `#0a1a2e` / `#4b5563` |
| Header | Default | Gray-800 | White | Gray-700 (bottom) | - | `#1f2937` / `#ffffff` / `#374151` |
| Body | Default | Dark-bg-secondary | White | - | - | `#0a1a2e` / `#ffffff` |
| Footer | Default | Gray-800 | Gray-300 | Gray-700 (top) | - | `#1f2937` / `#d1d5db` / `#374151` |
| Title | Default | Transparent | White | - | - | `#ffffff` |
| Subtitle | Default | Transparent | Gray-400 | - | - | `#9ca3af` |
| Content | Default | Transparent | Gray-300 | - | - | `#d1d5db` |

#### Tailwind Classes

```tsx
// Card Container
className="bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"

// Card Header
className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 rounded-t-lg"

// Card Body
className="px-6 py-4"

// Card Footer
className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700 rounded-b-lg"

// Card Title
className="text-gray-900 dark:text-white text-lg font-semibold"

// Card Subtitle
className="text-gray-600 dark:text-gray-400 text-sm"

// Card Content
className="text-gray-700 dark:text-gray-300"**WCAG Compliance**: All text meets 4.5:1 contrast ratio. Card backgrounds provide sufficient contrast with text.

### Dialog/Modal Component

Dialogs and modals are used for overlaying content and user interactions.

#### Light Theme

| Element | State | Background | Text | Border | Overlay | Hex Codes |
|---------|-------|------------|------|--------|---------|-----------|
| Overlay | Default | Black/50 | - | - | - | `rgba(0, 0, 0, 0.5)` |
| Container | Default | White | - | - | - | `#ffffff` |
| Header | Default | White | Gray-900 | Gray-200 (bottom) | - | `#ffffff` / `#111827` / `#e5e7eb` |
| Body | Default | White | Gray-700 | - | - | `#ffffff` / `#374151` |
| Footer | Default | Gray-50 | Gray-700 | Gray-200 (top) | - | `#f9fafb` / `#374151` / `#e5e7eb` |
| Close Button | Default | Transparent | Gray-500 | - | - | `#6b7280` |
| Close Button | Hover | Gray-100 | Gray-700 | - | - | `#f3f4f6` / `#374151` |
| Close Button | Focus | Gray-100 | Gray-700 | Primary-500 (ring) | - | `#f3f4f6` / `#374151` / `#34b7ff` |
| Title | Default | Transparent | Gray-900 | - | - | `#111827` |
| Content | Default | Transparent | Gray-700 | - | - | `#374151` |

#### Dark Theme

| Element | State | Background | Text | Border | Overlay | Hex Codes |
|---------|-------|------------|------|--------|---------|-----------|
| Overlay | Default | Black/75 | - | - | - | `rgba(0, 0, 0, 0.75)` |
| Container | Default | Dark-bg-secondary | - | - | - | `#0a1a2e` |
| Header | Default | Dark-bg-secondary | White | Gray-700 (bottom) | - | `#0a1a2e` / `#ffffff` / `#374151` |
| Body | Default | Dark-bg-secondary | Gray-300 | - | - | `#0a1a2e` / `#d1d5db` |
| Footer | Default | Gray-800 | Gray-300 | Gray-700 (top) | - | `#1f2937` / `#d1d5db` / `#374151` |
| Close Button | Default | Transparent | Gray-400 | - | - | `#9ca3af` |
| Close Button | Hover | Gray-700 | White | - | - | `#374151` / `#ffffff` |
| Close Button | Focus | Gray-700 | White | Primary-500 (ring) | - | `#374151` / `#ffffff` / `#34b7ff` |
| Title | Default | Transparent | White | - | - | `#ffffff` |
| Content | Default | Transparent | Gray-300 | - | - | `#d1d5db` |

#### Tailwind Classes

```tsx
// Overlay
className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-75 z-50"

// Modal Container
className="bg-white dark:bg-dark-bg-secondary rounded-lg shadow-xl max-w-2xl w-full"

// Modal Header
className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"

// Modal Body
className="px-6 py-4 text-gray-700 dark:text-gray-300"

// Modal Footer
className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-b-lg"

// Close Button
className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-1 focus:outline-none focus:ring-2 focus:ring-primary-500"**WCAG Compliance**: Overlay provides sufficient contrast. All text meets 4.5:1 contrast ratio. Focus states are clearly visible.

### Drawer Component

Drawers slide in from the side for additional content or navigation.

#### Light Theme

| Element | State | Background | Text | Border | Overlay | Hex Codes |
|---------|-------|------------|------|--------|---------|-----------|
| Overlay | Default | Black/50 | - | - | - | `rgba(0, 0, 0, 0.5)` |
| Container | Default | White | - | Gray-200 (left) | - | `#ffffff` / `#e5e7eb` |
| Header | Default | White | Gray-900 | Gray-200 (bottom) | - | `#ffffff` / `#111827` / `#e5e7eb` |
| Body | Default | White | Gray-700 | - | - | `#ffffff` / `#374151` |
| Footer | Default | Gray-50 | Gray-700 | Gray-200 (top) | - | `#f9fafb` / `#374151` / `#e5e7eb` |
| Close Button | Default | Transparent | Gray-500 | - | - | `#6b7280` |
| Close Button | Hover | Gray-100 | Gray-700 | - | - | `#f3f4f6` / `#374151` |

#### Dark Theme

| Element | State | Background | Text | Border | Overlay | Hex Codes |
|---------|-------|------------|------|--------|---------|-----------|
| Overlay | Default | Black/75 | - | - | - | `rgba(0, 0, 0, 0.75)` |
| Container | Default | Dark-bg-secondary | - | Gray-700 (left) | - | `#0a1a2e` / `#374151` |
| Header | Default | Dark-bg-secondary | White | Gray-700 (bottom) | - | `#0a1a2e` / `#ffffff` / `#374151` |
| Body | Default | Dark-bg-secondary | Gray-300 | - | - | `#0a1a2e` / `#d1d5db` |
| Footer | Default | Gray-800 | Gray-300 | Gray-700 (top) | - | `#1f2937` / `#d1d5db` / `#374151` |
| Close Button | Default | Transparent | Gray-400 | - | - | `#9ca3af` |
| Close Button | Hover | Gray-700 | White | - | - | `#374151` / `#ffffff` |

#### Tailwind Classes

```tsx
// Overlay
className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-75 z-50"

// Drawer Container
className="bg-white dark:bg-dark-bg-secondary border-r border-gray-200 dark:border-gray-700 h-full w-80 shadow-xl"

// Drawer Header
className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"

// Drawer Body
className="px-6 py-4 text-gray-700 dark:text-gray-300 overflow-y-auto"

// Drawer Footer
className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"**WCAG Compliance**: All text meets 4.5:1 contrast ratio. Overlay provides sufficient contrast.

### Button Component

Buttons are used for actions throughout the application.

#### Light Theme

| Variant | State | Background | Text | Border | Hex Codes |
|---------|-------|------------|------|--------|-----------|
| Primary | Default | Primary-500 | White | Primary-500 | `#34b7ff` / `#ffffff` |
| Primary | Hover | Primary-600 | White | Primary-600 | `#2aa3e6` / `#ffffff` |
| Primary | Active | Primary-700 | White | Primary-700 | `#1e7ab8` / `#ffffff` |
| Primary | Focus | Primary-500 | White | Primary-500 (ring) | `#34b7ff` / `#ffffff` |
| Primary | Disabled | Gray-300 | Gray-500 | Gray-300 | `#d1d5db` / `#6b7280` |
| Secondary | Default | White | Gray-700 | Gray-300 | `#ffffff` / `#374151` / `#d1d5db` |
| Secondary | Hover | Gray-50 | Gray-900 | Gray-400 | `#f9fafb` / `#111827` / `#9ca3af` |
| Secondary | Active | Gray-100 | Gray-900 | Gray-400 | `#f3f4f6` / `#111827` / `#9ca3af` |
| Secondary | Focus | White | Gray-700 | Primary-500 (ring) | `#ffffff` / `#374151` / `#34b7ff` |
| Secondary | Disabled | White | Gray-400 | Gray-300 | `#ffffff` / `#9ca3af` / `#d1d5db` |
| Danger | Default | Red-500 | White | Red-500 | `#ef4444` / `#ffffff` |
| Danger | Hover | Red-600 | White | Red-600 | `#dc2626` / `#ffffff` |
| Danger | Active | Red-700 | White | Red-700 | `#b91c1c` / `#ffffff` |
| Danger | Focus | Red-500 | White | Red-500 (ring) | `#ef4444` / `#ffffff` |
| Danger | Disabled | Gray-300 | Gray-500 | Gray-300 | `#d1d5db` / `#6b7280` |
| Ghost | Default | Transparent | Gray-700 | - | `#374151` |
| Ghost | Hover | Gray-100 | Gray-900 | - | `#f3f4f6` / `#111827` |
| Ghost | Active | Gray-200 | Gray-900 | - | `#e5e7eb` / `#111827` |
| Ghost | Focus | Transparent | Gray-700 | Primary-500 (ring) | `#374151` / `#34b7ff` |
| Ghost | Disabled | Transparent | Gray-400 | - | `#9ca3af` |

#### Dark Theme

| Variant | State | Background | Text | Border | Hex Codes |
|---------|-------|------------|------|--------|-----------|
| Primary | Default | Primary-500 | White | Primary-500 | `#34b7ff` / `#ffffff` |
| Primary | Hover | Primary-600 | White | Primary-600 | `#2aa3e6` / `#ffffff` |
| Primary | Active | Primary-700 | White | Primary-700 | `#1e7ab8` / `#ffffff` |
| Primary | Focus | Primary-500 | White | Primary-500 (ring) | `#34b7ff` / `#ffffff` |
| Primary | Disabled | Gray-700 | Gray-500 | Gray-700 | `#374151` / `#6b7280` |
| Secondary | Default | Gray-800 | Gray-300 | Gray-700 | `#1f2937` / `#d1d5db` / `#374151` |
| Secondary | Hover | Gray-700 | White | Gray-600 | `#374151` / `#ffffff` / `#4b5563` |
| Secondary | Active | Gray-600 | White | Gray-600 | `#4b5563` / `#ffffff` |
| Secondary | Focus | Gray-800 | Gray-300 | Primary-500 (ring) | `#1f2937` / `#d1d5db` / `#34b7ff` |
| Secondary | Disabled | Gray-800 | Gray-600 | Gray-700 | `#1f2937` / `#4b5563` / `#374151` |
| Danger | Default | Red-500 | White | Red-500 | `#ef4444` / `#ffffff` |
| Danger | Hover | Red-600 | White | Red-600 | `#dc2626` / `#ffffff` |
| Danger | Active | Red-700 | White | Red-700 | `#b91c1c` / `#ffffff` |
| Danger | Focus | Red-500 | White | Red-500 (ring) | `#ef4444` / `#ffffff` |
| Danger | Disabled | Gray-700 | Gray-500 | Gray-700 | `#374151` / `#6b7280` |
| Ghost | Default | Transparent | Gray-300 | - | `#d1d5db` |
| Ghost | Hover | Gray-700 | White | - | `#374151` / `#ffffff` |
| Ghost | Active | Gray-600 | White | - | `#4b5563` / `#ffffff` |
| Ghost | Focus | Transparent | Gray-300 | Primary-500 (ring) | `#d1d5db` / `#34b7ff` |
| Ghost | Disabled | Transparent | Gray-600 | - | `#4b5563` |

#### Tailwind Classes

```tsx
// Primary Button
className="bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white border border-primary-500 hover:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:text-gray-500 dark:disabled:text-gray-500 disabled:cursor-not-allowed"

// Secondary Button
className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-white dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed"

// Danger Button
className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white border border-red-500 hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:text-gray-500 dark:disabled:text-gray-500 disabled:cursor-not-allowed"

// Ghost Button
className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed"**WCAG Compliance**: All button variants meet 4.5:1 contrast ratio. Focus states are clearly visible with ring indicators.

### Input Component

Input fields are used for form data entry.

#### Light Theme

| Element | State | Background | Text | Border | Placeholder | Hex Codes |
|---------|-------|------------|------|--------|-------------|-----------|
| Input | Default | White | Gray-900 | Gray-300 | Gray-500 | `#ffffff` / `#111827` / `#d1d5db` / `#6b7280` |
| Input | Hover | White | Gray-900 | Gray-400 | Gray-500 | `#ffffff` / `#111827` / `#9ca3af` / `#6b7280` |
| Input | Focus | White | Gray-900 | Primary-500 | Gray-500 | `#ffffff` / `#111827` / `#34b7ff` / `#6b7280` |
| Input | Disabled | Gray-50 | Gray-500 | Gray-300 | Gray-400 | `#f9fafb` / `#6b7280` / `#d1d5db` / `#9ca3af` |
| Input | Error | White | Gray-900 | Red-500 | Gray-500 | `#ffffff` / `#111827` / `#ef4444` / `#6b7280` |
| Input | Error Focus | White | Gray-900 | Red-500 (ring) | Gray-500 | `#ffffff` / `#111827` / `#ef4444` / `#6b7280` |
| Label | Default | Transparent | Gray-700 | - | - | `#374151` |
| Label | Required | Transparent | Gray-700 | - | - | `#374151` |
| Error Text | Default | Transparent | Red-600 | - | - | `#dc2626` |
| Helper Text | Default | Transparent | Gray-600 | - | - | `#4b5563` |

#### Dark Theme

| Element | State | Background | Text | Border | Placeholder | Hex Codes |
|---------|-------|------------|------|--------|-------------|-----------|
| Input | Default | Dark-bg-secondary | White | Gray-600 | Gray-500 | `#0a1a2e` / `#ffffff` / `#4b5563` / `#6b7280` |
| Input | Hover | Dark-bg-secondary | White | Gray-500 | Gray-500 | `#0a1a2e` / `#ffffff` / `#6b7280` / `#6b7280` |
| Input | Focus | Dark-bg-secondary | White | Primary-500 | Gray-500 | `#0a1a2e` / `#ffffff` / `#34b7ff` / `#6b7280` |
| Input | Disabled | Gray-800 | Gray-500 | Gray-700 | Gray-600 | `#1f2937` / `#6b7280` / `#374151` / `#4b5563` |
| Input | Error | Dark-bg-secondary | White | Red-500 | Gray-500 | `#0a1a2e` / `#ffffff` / `#ef4444` / `#6b7280` |
| Input | Error Focus | Dark-bg-secondary | White | Red-500 (ring) | Gray-500 | `#0a1a2e` / `#ffffff` / `#ef4444` / `#6b7280` |
| Label | Default | Transparent | Gray-300 | - | - | `#d1d5db` |
| Label | Required | Transparent | Gray-300 | - | - | `#d1d5db` |
| Error Text | Default | Transparent | Red-400 | - | - | `#f87171` |
| Helper Text | Default | Transparent | Gray-400 | - | - | `#9ca3af` |

#### Tailwind Classes

```tsx
// Input - Default
className="w-full px-4 py-2 bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors placeholder:text-gray-500"

// Input - Error
className="w-full px-4 py-2 bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors placeholder:text-gray-500"

// Input - Disabled
className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-500 border border-gray-300 dark:border-gray-700 rounded-lg cursor-not-allowed placeholder:text-gray-400 dark:placeholder:text-gray-600"

// Label
className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"

// Error Text
className="mt-1 text-sm text-red-600 dark:text-red-400"

// Helper Text
className="mt-1 text-sm text-gray-600 dark:text-gray-400"**WCAG Compliance**: All text meets 4.5:1 contrast ratio. Error states are clearly indicated with red borders and text.

### Table Component

Tables are used for displaying structured data.

#### Light Theme

| Element | State | Background | Text | Border | Hex Codes |
|---------|-------|------------|------|--------|-----------|
| Container | Default | White | - | Gray-200 | `#ffffff` / `#e5e7eb` |
| Header | Default | Gray-50 | Gray-900 | Gray-200 (bottom) | `#f9fafb` / `#111827` / `#e5e7eb` |
| Header Cell | Default | Gray-50 | Gray-700 | - | `#f9fafb` / `#374151` |
| Row | Default | White | Gray-900 | Gray-200 (bottom) | `#ffffff` / `#111827` / `#e5e7eb` |
| Row | Hover | Gray-50 | Gray-900 | Gray-200 (bottom) | `#f9fafb` / `#111827` / `#e5e7eb` |
| Row | Selected | Primary-50 | Primary-700 | Primary-200 (bottom) | `#e0f2fe` / `#0369a1` / `#bae6fd` |
| Cell | Default | Transparent | Gray-700 | - | `#374151` |
| Cell | Selected | Transparent | Primary-700 | - | `#0369a1` |

#### Dark Theme

| Element | State | Background | Text | Border | Hex Codes |
|---------|-------|------------|------|--------|-----------|
| Container | Default | Dark-bg-secondary | - | Gray-700 | `#0a1a2e` / `#374151` |
| Header | Default | Gray-800 | White | Gray-700 (bottom) | `#1f2937` / `#ffffff` / `#374151` |
| Header Cell | Default | Gray-800 | Gray-300 | - | `#1f2937` / `#d1d5db` |
| Row | Default | Dark-bg-secondary | White | Gray-700 (bottom) | `#0a1a2e` / `#ffffff` / `#374151` |
| Row | Hover | Gray-800 | White | Gray-700 (bottom) | `#1f2937` / `#ffffff` / `#374151` |
| Row | Selected | Primary-900/30 | Primary-300 | Primary-700 (bottom) | `rgba(30, 58, 138, 0.3)` / `#93c5fd` / `#1e40af` |
| Cell | Default | Transparent | Gray-300 | - | `#d1d5db` |
| Cell | Selected | Transparent | Primary-300 | - | `#93c5fd` |

#### Tailwind Classes

```tsx
// Table Container
className="bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"

// Table Header
className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"

// Table Header Cell
className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"

// Table Row - Default
className="bg-white dark:bg-dark-bg-secondary border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"

// Table Row - Selected
className="bg-primary-50 dark:bg-primary-900/30 border-b border-primary-200 dark:border-primary-700"

// Table Cell
className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300"**WCAG Compliance**: All text meets 4.5:1 contrast ratio. Selected rows provide clear visual feedback.

### Tooltip Component

Tooltips provide contextual information on hover.

#### Light Theme

| Element | State | Background | Text | Border | Shadow | Hex Codes |
|---------|-------|------------|------|--------|--------|-----------|
| Container | Default | Gray-900 | White | - | Lg | `#111827` / `#ffffff` |
| Arrow | Default | Gray-900 | - | - | - | `#111827` |

#### Dark Theme

| Element | State | Background | Text | Border | Shadow | Hex Codes |
|---------|-------|------------|------|--------|--------|-----------|
| Container | Default | Gray-800 | White | - | Lg | `#1f2937` / `#ffffff` |
| Arrow | Default | Gray-800 | - | - | - | `#1f2937` |

#### Tailwind Classes

```tsx
// Tooltip Container
className="bg-gray-900 dark:bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg max-w-xs z-50"

// Tooltip Arrow
className="bg-gray-900 dark:bg-gray-800"**WCAG Compliance**: White text on dark background meets 4.5:1 contrast ratio.

### Alert/Notification Component

Alerts provide feedback messages to users.

#### Light Theme

| Variant | Background | Text | Border | Icon | Hex Codes |
|---------|------------|------|--------|------|-----------|
| Success | Green-50 | Green-800 | Green-200 | Green-600 | `#f0fdf4` / `#166534` / `#bbf7d0` / `#16a34a` |
| Error | Red-50 | Red-800 | Red-200 | Red-600 | `#fef2f2` / `#991b1b` / `#fecaca` / `#dc2626` |
| Warning | Yellow-50 | Yellow-800 | Yellow-200 | Yellow-600 | `#fefce8` / `#854d0e` / `#fde047` / `#ca8a04` |
| Info | Blue-50 | Blue-800 | Blue-200 | Blue-600 | `#eff6ff` / `#1e40af` / `#bfdbfe` / `#2563eb` |

#### Dark Theme

| Variant | Background | Text | Border | Icon | Hex Codes |
|---------|------------|------|--------|------|-----------|
| Success | Green-900/30 | Green-300 | Green-700 | Green-400 | `rgba(20, 83, 45, 0.3)` / `#86efac` / `#15803d` / `#4ade80` |
| Error | Red-900/30 | Red-300 | Red-700 | Red-400 | `rgba(127, 29, 29, 0.3)` / `#fca5a5` / `#b91c1c` / `#f87171` |
| Warning | Yellow-900/30 | Yellow-300 | Yellow-700 | Yellow-400 | `rgba(113, 63, 18, 0.3)` / `#fde047` / `#a16207` / `#facc15` |
| Info | Blue-900/30 | Blue-300 | Blue-700 | Blue-400 | `rgba(30, 64, 175, 0.3)` / `#93c5fd` / `#1e40af` / `#60a5fa` |

#### Tailwind Classes

```tsx
// Success Alert
className="bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700 rounded-lg p-4"

// Error Alert
className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-700 rounded-lg p-4"

// Warning Alert
className="bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4"

// Info Alert
className="bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-700 rounded-lg p-4"**WCAG Compliance**: All alert variants meet 4.5:1 contrast ratio for text on background.

### Badge Component

Badges display small status indicators or counts.

#### Light Theme

| Variant | Background | Text | Border | Hex Codes |
|---------|------------|------|--------|-----------|
| Default | Gray-100 | Gray-800 | - | `#f3f4f6` / `#1f2937` |
| Primary | Primary-100 | Primary-800 | - | `#dbeafe` / `#1e40af` |
| Success | Green-100 | Green-800 | - | `#dcfce7` / `#166534` |
| Error | Red-100 | Red-800 | - | `#fee2e2` / `#991b1b` |
| Warning | Yellow-100 | Yellow-800 | - | `#fef9c3` / `#854d0e` |
| Info | Blue-100 | Blue-800 | - | `#dbeafe` / `#1e40af` |

#### Dark Theme

| Variant | Background | Text | Border | Hex Codes |
|---------|------------|------|--------|-----------|
| Default | Gray-800 | Gray-300 | - | `#1f2937` / `#d1d5db` |
| Primary | Primary-900/50 | Primary-300 | - | `rgba(30, 64, 175, 0.5)` / `#93c5fd` |
| Success | Green-900/50 | Green-300 | - | `rgba(20, 83, 45, 0.5)` / `#86efac` |
| Error | Red-900/50 | Red-300 | - | `rgba(127, 29, 29, 0.5)` / `#fca5a5` |
| Warning | Yellow-900/50 | Yellow-300 | - | `rgba(113, 63, 18, 0.5)` / `#fde047` |
| Info | Blue-900/50 | Blue-300 | - | `rgba(30, 64, 175, 0.5)` / `#93c5fd` |

#### Tailwind Classes

```tsx
// Default Badge
className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium"

// Primary Badge
className="bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-300 px-2 py-1 rounded-full text-xs font-medium"

// Success Badge
className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium"

// Error Badge
className="bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 px-2 py-1 rounded-full text-xs font-medium"

// Warning Badge
className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded-full text-xs font-medium"

// Info Badge
className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium"**WCAG Compliance**: All badge variants meet 4.5:1 contrast ratio.

### Dropdown/Menu Component

Dropdowns and menus provide contextual action lists.

#### Light Theme

| Element | State | Background | Text | Border | Hex Codes |
|---------|-------|------------|------|--------|-----------|
| Container | Default | White | - | Gray-200 | `#ffffff` / `#e5e7eb` |
| Menu Item | Default | White | Gray-700 | - | `#ffffff` / `#374151` |
| Menu Item | Hover | Gray-100 | Gray-900 | - | `#f3f4f6` / `#111827` |
| Menu Item | Active | Primary-50 | Primary-700 | - | `#e0f2fe` / `#0369a1` |
| Menu Item | Focus | Gray-50 | Gray-900 | Primary-500 (ring) | `#f9fafb` / `#111827` / `#34b7ff` |
| Menu Item | Disabled | White | Gray-400 | - | `#ffffff` / `#9ca3af` |
| Divider | Default | Gray-200 | - | - | `#e5e7eb` |

#### Dark Theme

| Element | State | Background | Text | Border | Hex Codes |
|---------|-------|------------|------|--------|-----------|
| Container | Default | Dark-bg-secondary | - | Gray-700 | `#0a1a2e` / `#374151` |
| Menu Item | Default | Dark-bg-secondary | Gray-300 | - | `#0a1a2e` / `#d1d5db` |
| Menu Item | Hover | Gray-700 | White | - | `#374151` / `#ffffff` |
| Menu Item | Active | Primary-900/30 | Primary-300 | - | `rgba(30, 64, 175, 0.3)` / `#93c5fd` |
| Menu Item | Focus | Gray-800 | White | Primary-500 (ring) | `#1f2937` / `#ffffff` / `#34b7ff` |
| Menu Item | Disabled | Dark-bg-secondary | Gray-600 | - | `#0a1a2e` / `#4b5563` |
| Divider | Default | Gray-700 | - | - | `#374151` |

#### Tailwind Classes

```tsx
// Dropdown Container
className="bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-50"

// Menu Item - Default
className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-50 dark:focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"

// Menu Item - Active
className="px-4 py-2 text-sm bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"

// Menu Item - Disabled
className="px-4 py-2 text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed"

// Divider
className="my-1 border-t border-gray-200 dark:border-gray-700"**WCAG Compliance**: All menu items meet 4.5:1 contrast ratio. Focus states are clearly visible.

### Tabs Component

Tabs are used for organizing content into multiple sections within the same view.

#### Light Theme

| Element | State | Background | Text | Icon | Border | Indicator | Hex Codes |
|---------|-------|------------|------|------|--------|-----------|-----------|
| Tab Container | Default | Transparent | - | - | Gray-200 (bottom) | - | `#e5e7eb` |
| Tab Item | Default | Transparent | Gray-600 | Gray-500 | - | - | `#4b5563` / `#6b7280` |
| Tab Item | Hover | Gray-50 | Gray-900 | Gray-700 | - | - | `#f9fafb` / `#111827` / `#374151` |
| Tab Item | Active | Transparent | Primary-500 | Primary-500 | - | Primary-500 (bottom) | `#34b7ff` / `#34b7ff` / `#34b7ff` |
| Tab Item | Focus | Gray-50 | Gray-900 | Gray-700 | Primary-500 (ring) | - | `#f9fafb` / `#111827` / `#374151` / `#34b7ff` |
| Tab Item | Disabled | Transparent | Gray-400 | Gray-400 | - | - | `#9ca3af` / `#9ca3af` |
| Tab Panel | Default | White | Gray-900 | - | - | - | `#ffffff` / `#111827` |
| Tab Panel Border | Default | - | - | - | Gray-200 (top) | - | `#e5e7eb` |

#### Dark Theme

| Element | State | Background | Text | Icon | Border | Indicator | Hex Codes |
|---------|-------|------------|------|------|--------|-----------|-----------|
| Tab Container | Default | Transparent | - | - | Gray-700 (bottom) | - | `#374151` |
| Tab Item | Default | Transparent | Gray-400 | Gray-500 | - | - | `#9ca3af` / `#6b7280` |
| Tab Item | Hover | Gray-800 | White | Gray-300 | - | - | `#1f2937` / `#ffffff` / `#d1d5db` |
| Tab Item | Active | Transparent | Primary-500 | Primary-500 | - | Primary-500 (bottom) | `#34b7ff` / `#34b7ff` / `#34b7ff` |
| Tab Item | Focus | Gray-800 | White | Gray-300 | Primary-500 (ring) | - | `#1f2937` / `#ffffff` / `#d1d5db` / `#34b7ff` |
| Tab Item | Disabled | Transparent | Gray-600 | Gray-600 | - | - | `#4b5563` / `#4b5563` |
| Tab Panel | Default | Dark-bg-secondary | White | - | - | - | `#0a1a2e` / `#ffffff` |
| Tab Panel Border | Default | - | - | - | Gray-700 (top) | - | `#374151` |

#### Tailwind Classes

```tsx
// Tab Container
className="border-b border-gray-200 dark:border-gray-700"

// Tab List
className="flex space-x-1"

// Tab Item - Default
className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 border-b-2 border-transparent hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600 transition-colors"

// Tab Item - Active
className="px-4 py-2 text-sm font-medium text-primary-500 border-b-2 border-primary-500"

// Tab Item - Focus
className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 border-b-2 border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg-secondary"

// Tab Item - Disabled
className="px-4 py-2 text-sm font-medium text-gray-400 dark:text-gray-600 border-b-2 border-transparent cursor-not-allowed opacity-50"

// Tab Panel
className="mt-4 bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-4"**WCAG Compliance**: All tab items meet 4.5:1 contrast ratio. Active tabs are clearly indicated with primary color border. Focus states are visible.

### Checkbox Component

Checkboxes are used for selecting one or more options from a list.

#### Light Theme

| Element | State | Background | Border | Checkmark | Text | Hex Codes |
|---------|-------|------------|-------|-----------|------|-----------|
| Checkbox | Default | White | Gray-300 | - | - | `#ffffff` / `#d1d5db` |
| Checkbox | Hover | White | Gray-400 | - | - | `#ffffff` / `#9ca3af` |
| Checkbox | Checked | Primary-500 | Primary-500 | White | - | `#34b7ff` / `#34b7ff` / `#ffffff` |
| Checkbox | Focus | White | Primary-500 | - | - | `#ffffff` / `#34b7ff` |
| Checkbox | Disabled | Gray-50 | Gray-300 | - | - | `#f9fafb` / `#d1d5db` |
| Checkbox | Disabled Checked | Gray-50 | Gray-300 | Gray-400 | - | `#f9fafb` / `#d1d5db` / `#9ca3af` |
| Checkbox | Error | White | Red-500 | - | - | `#ffffff` / `#ef4444` |
| Label | Default | Transparent | - | - | Gray-700 | `#374151` |
| Label | Disabled | Transparent | - | - | Gray-400 | `#9ca3af` |

#### Dark Theme

| Element | State | Background | Border | Checkmark | Text | Hex Codes |
|---------|-------|------------|-------|-----------|------|-----------|
| Checkbox | Default | Dark-bg-secondary | Gray-600 | - | - | `#0a1a2e` / `#4b5563` |
| Checkbox | Hover | Dark-bg-secondary | Gray-500 | - | - | `#0a1a2e` / `#6b7280` |
| Checkbox | Checked | Primary-500 | Primary-500 | White | - | `#34b7ff` / `#34b7ff` / `#ffffff` |
| Checkbox | Focus | Dark-bg-secondary | Primary-500 | - | - | `#0a1a2e` / `#34b7ff` |
| Checkbox | Disabled | Gray-800 | Gray-700 | - | - | `#1f2937` / `#374151` |
| Checkbox | Disabled Checked | Gray-800 | Gray-700 | Gray-500 | - | `#1f2937` / `#374151` / `#6b7280` |
| Checkbox | Error | Dark-bg-secondary | Red-500 | - | - | `#0a1a2e` / `#ef4444` |
| Label | Default | Transparent | - | - | Gray-300 | `#d1d5db` |
| Label | Disabled | Transparent | - | - | Gray-600 | `#4b5563` |

#### Tailwind Classes

```tsx
// Checkbox - Default
className="w-4 h-4 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-gray-600 rounded text-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg-secondary cursor-pointer transition-colors"

// Checkbox - Checked
className="w-4 h-4 bg-primary-500 border-primary-500 rounded text-white focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg-secondary cursor-pointer"

// Checkbox - Disabled
className="w-4 h-4 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded cursor-not-allowed opacity-50"

// Checkbox - Error
className="w-4 h-4 bg-white dark:bg-dark-bg-secondary border-red-500 rounded text-primary-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer"

// Checkbox Label
className="ml-2 text-sm text-gray-700 dark:text-gray-300"

// Checkbox Label - Disabled
className="ml-2 text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed"**WCAG Compliance**: All checkbox states meet 4.5:1 contrast ratio. Focus states are clearly visible with ring indicators.

### Radio Component

Radio buttons are used for selecting a single option from a group of options.

#### Light Theme

| Element | State | Background | Border | Dot | Text | Hex Codes |
|---------|-------|------------|-------|-----|------|-----------|
| Radio | Default | White | Gray-300 | - | - | `#ffffff` / `#d1d5db` |
| Radio | Hover | White | Gray-400 | - | - | `#ffffff` / `#9ca3af` |
| Radio | Checked | White | Primary-500 | Primary-500 | - | `#ffffff` / `#34b7ff` / `#34b7ff` |
| Radio | Focus | White | Primary-500 | - | - | `#ffffff` / `#34b7ff` |
| Radio | Disabled | Gray-50 | Gray-300 | - | - | `#f9fafb` / `#d1d5db` |
| Radio | Disabled Checked | Gray-50 | Gray-300 | Gray-400 | - | `#f9fafb` / `#d1d5db` / `#9ca3af` |
| Radio | Error | White | Red-500 | - | - | `#ffffff` / `#ef4444` |
| Label | Default | Transparent | - | - | Gray-700 | `#374151` |
| Label | Disabled | Transparent | - | - | Gray-400 | `#9ca3af` |

#### Dark Theme

| Element | State | Background | Border | Dot | Text | Hex Codes |
|---------|-------|------------|-------|-----|------|-----------|
| Radio | Default | Dark-bg-secondary | Gray-600 | - | - | `#0a1a2e` / `#4b5563` |
| Radio | Hover | Dark-bg-secondary | Gray-500 | - | - | `#0a1a2e` / `#6b7280` |
| Radio | Checked | Dark-bg-secondary | Primary-500 | Primary-500 | - | `#0a1a2e` / `#34b7ff` / `#34b7ff` |
| Radio | Focus | Dark-bg-secondary | Primary-500 | - | - | `#0a1a2e` / `#34b7ff` |
| Radio | Disabled | Gray-800 | Gray-700 | - | - | `#1f2937` / `#374151` |
| Radio | Disabled Checked | Gray-800 | Gray-700 | Gray-500 | - | `#1f2937` / `#374151` / `#6b7280` |
| Radio | Error | Dark-bg-secondary | Red-500 | - | - | `#0a1a2e` / `#ef4444` |
| Label | Default | Transparent | - | - | Gray-300 | `#d1d5db` |
| Label | Disabled | Transparent | - | - | Gray-600 | `#4b5563` |

#### Tailwind Classes

```tsx
// Radio - Default
className="w-4 h-4 bg-white dark:bg-dark-bg-secondary border-2 border-gray-300 dark:border-gray-600 rounded-full text-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg-secondary cursor-pointer transition-colors"

// Radio - Checked
className="w-4 h-4 bg-white dark:bg-dark-bg-secondary border-2 border-primary-500 rounded-full text-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg-secondary cursor-pointer"

// Radio - Disabled
className="w-4 h-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-full cursor-not-allowed opacity-50"

// Radio - Error
className="w-4 h-4 bg-white dark:bg-dark-bg-secondary border-2 border-red-500 rounded-full text-primary-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer"

// Radio Label
className="ml-2 text-sm text-gray-700 dark:text-gray-300"

// Radio Label - Disabled
className="ml-2 text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed"**WCAG Compliance**: All radio states meet 4.5:1 contrast ratio. Focus states are clearly visible with ring indicators.

### Switch/Toggle Component

Switches are used for binary on/off states.

#### Light Theme

| Element | State | Background | Thumb | Border | Text | Hex Codes |
|---------|-------|------------|-------|--------|------|-----------|
| Switch | Off | Gray-200 | White | - | - | `#e5e7eb` / `#ffffff` |
| Switch | On | Primary-500 | White | - | - | `#34b7ff` / `#ffffff` |
| Switch | Hover Off | Gray-300 | White | - | - | `#d1d5db` / `#ffffff` |
| Switch | Hover On | Primary-600 | White | - | - | `#2aa3e6` / `#ffffff` |
| Switch | Focus | Gray-200/Primary-500 | White | Primary-500 (ring) | - | `#e5e7eb` or `#34b7ff` / `#ffffff` / `#34b7ff` |
| Switch | Disabled Off | Gray-100 | Gray-300 | - | - | `#f3f4f6` / `#d1d5db` |
| Switch | Disabled On | Gray-300 | Gray-400 | - | - | `#d1d5db` / `#9ca3af` |
| Label | Default | Transparent | - | - | Gray-700 | `#374151` |
| Label | Disabled | Transparent | - | - | Gray-400 | `#9ca3af` |

#### Dark Theme

| Element | State | Background | Thumb | Border | Text | Hex Codes |
|---------|-------|------------|-------|--------|------|-----------|
| Switch | Off | Gray-700 | Gray-300 | - | - | `#374151` / `#d1d5db` |
| Switch | On | Primary-500 | White | - | - | `#34b7ff` / `#ffffff` |
| Switch | Hover Off | Gray-600 | Gray-300 | - | - | `#4b5563` / `#d1d5db` |
| Switch | Hover On | Primary-600 | White | - | - | `#2aa3e6` / `#ffffff` |
| Switch | Focus | Gray-700/Primary-500 | Gray-300/White | Primary-500 (ring) | - | `#374151` or `#34b7ff` / `#d1d5db` or `#ffffff` / `#34b7ff` |
| Switch | Disabled Off | Gray-800 | Gray-600 | - | - | `#1f2937` / `#4b5563` |
| Switch | Disabled On | Gray-700 | Gray-500 | - | - | `#374151` / `#6b7280` |
| Label | Default | Transparent | - | - | Gray-300 | `#d1d5db` |
| Label | Disabled | Transparent | - | - | Gray-600 | `#4b5563` |

#### Tailwind Classes

```tsx
// Switch Container
className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-dark-bg-secondary"

// Switch - Off
className="bg-gray-200 dark:bg-gray-700"

// Switch - On
className="bg-primary-500"

// Switch - Disabled
className="bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-50"

// Switch Thumb
className="inline-block h-4 w-4 transform rounded-full bg-white dark:bg-gray-300 transition-transform translate-x-1"

// Switch Thumb - On
className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"

// Switch Label
className="ml-3 text-sm text-gray-700 dark:text-gray-300"

// Switch Label - Disabled
className="ml-3 text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed"**WCAG Compliance**: All switch states meet 4.5:1 contrast ratio. Focus states are clearly visible with ring indicators.

### Progress Bar Component

Progress bars indicate the completion status of a task or process.

#### Light Theme

| Element | State | Background | Fill | Text | Border | Hex Codes |
|---------|-------|------------|------|------|--------|-----------|
| Progress Container | Default | Gray-200 | - | - | - | `#e5e7eb` |
| Progress Fill | Default | Primary-500 | Primary-500 | - | - | `#34b7ff` / `#34b7ff` |
| Progress Fill | Success | Green-500 | Green-500 | - | - | `#22c55e` / `#22c55e` |
| Progress Fill | Warning | Yellow-500 | Yellow-500 | - | - | `#eab308` / `#eab308` |
| Progress Fill | Error | Red-500 | Red-500 | - | - | `#ef4444` / `#ef4444` |
| Progress Text | Default | Transparent | - | Gray-700 | - | `#374151` |
| Progress Label | Default | Transparent | - | Gray-600 | - | `#4b5563` |

#### Dark Theme

| Element | State | Background | Fill | Text | Border | Hex Codes |
|---------|-------|------------|------|------|--------|-----------|
| Progress Container | Default | Gray-700 | - | - | - | `#374151` |
| Progress Fill | Default | Primary-500 | Primary-500 | - | - | `#34b7ff` / `#34b7ff` |
| Progress Fill | Success | Green-500 | Green-500 | - | - | `#22c55e` / `#22c55e` |
| Progress Fill | Warning | Yellow-500 | Yellow-500 | - | - | `#eab308` / `#eab308` |
| Progress Fill | Error | Red-500 | Red-500 | - | - | `#ef4444` / `#ef4444` |
| Progress Text | Default | Transparent | - | Gray-300 | - | `#d1d5db` |
| Progress Label | Default | Transparent | - | Gray-400 | - | `#9ca3af` |

#### Tailwind Classes

```tsx
// Progress Container
className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"

// Progress Fill - Default
className="h-full bg-primary-500 rounded-full transition-all duration-300"

// Progress Fill - Success
className="h-full bg-green-500 rounded-full transition-all duration-300"

// Progress Fill - Warning
className="h-full bg-yellow-500 rounded-full transition-all duration-300"

// Progress Fill - Error
className="h-full bg-red-500 rounded-full transition-all duration-300"

// Progress Text
className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1"

// Progress Label
className="text-xs text-gray-600 dark:text-gray-400 mb-1"**WCAG Compliance**: All progress bar colors meet 4.5:1 contrast ratio. Progress states are clearly distinguishable.

### Loading Spinner Component

Loading spinners indicate that content is being loaded or processed.

#### Light Theme

| Element | State | Color | Border | Hex Codes |
|---------|-------|-------|--------|-----------|
| Spinner | Default | Primary-500 | Gray-200 | `#34b7ff` / `#e5e7eb` |
| Spinner | Small | Primary-500 | Gray-200 | `#34b7ff` / `#e5e7eb` |
| Spinner | Large | Primary-500 | Gray-200 | `#34b7ff` / `#e5e7eb` |
| Spinner Text | Default | Gray-600 | - | `#4b5563` |

#### Dark Theme

| Element | State | Color | Border | Hex Codes |
|---------|-------|-------|--------|-----------|
| Spinner | Default | Primary-500 | Gray-700 | `#34b7ff` / `#374151` |
| Spinner | Small | Primary-500 | Gray-700 | `#34b7ff` / `#374151` |
| Spinner | Large | Primary-500 | Gray-700 | `#34b7ff` / `#374151` |
| Spinner Text | Default | Gray-400 | - | `#9ca3af` |

#### Tailwind Classes

```tsx
// Spinner - Default
className="animate-spin rounded-full border-2 border-gray-200 dark:border-gray-700 border-t-primary-500 w-6 h-6"

// Spinner - Small
className="animate-spin rounded-full border-2 border-gray-200 dark:border-gray-700 border-t-primary-500 w-4 h-4"

// Spinner - Large
className="animate-spin rounded-full border-2 border-gray-200 dark:border-gray-700 border-t-primary-500 w-8 h-8"

// Spinner Text
className="ml-2 text-sm text-gray-600 dark:text-gray-400"**WCAG Compliance**: Spinner colors provide sufficient contrast. Animation is smooth and not distracting.

### Breadcrumbs Component

Breadcrumbs show the navigation path to the current page.

#### Light Theme

| Element | State | Background | Text | Icon | Separator | Hex Codes |
|---------|-------|------------|------|------|-----------|-----------|
| Container | Default | Transparent | - | - | - | - |
| Breadcrumb Item | Default | Transparent | Gray-600 | Gray-500 | Gray-400 | `#4b5563` / `#6b7280` / `#9ca3af` |
| Breadcrumb Item | Hover | Transparent | Gray-900 | Gray-700 | - | `#111827` / `#374151` |
| Breadcrumb Item | Active | Transparent | Gray-900 | - | - | `#111827` |
| Breadcrumb Link | Default | Transparent | Primary-500 | - | - | `#34b7ff` |
| Breadcrumb Link | Hover | Transparent | Primary-600 | - | - | `#2aa3e6` |
| Separator | Default | Transparent | Gray-400 | Gray-400 | - | `#9ca3af` / `#9ca3af` |

#### Dark Theme

| Element | State | Background | Text | Icon | Separator | Hex Codes |
|---------|-------|------------|------|------|-----------|-----------|
| Container | Default | Transparent | - | - | - | - |
| Breadcrumb Item | Default | Transparent | Gray-400 | Gray-500 | Gray-600 | `#9ca3af` / `#6b7280` / `#4b5563` |
| Breadcrumb Item | Hover | Transparent | White | Gray-300 | - | `#ffffff` / `#d1d5db` |
| Breadcrumb Item | Active | Transparent | White | - | - | `#ffffff` |
| Breadcrumb Link | Default | Transparent | Primary-500 | - | - | `#34b7ff` |
| Breadcrumb Link | Hover | Transparent | Primary-400 | - | - | `#60a5fa` |
| Separator | Default | Transparent | Gray-600 | Gray-600 | - | `#4b5563` / `#4b5563` |

#### Tailwind Classes

```tsx
// Breadcrumb Container
className="flex items-center space-x-2"

// Breadcrumb Item
className="text-sm text-gray-600 dark:text-gray-400 flex items-center"

// Breadcrumb Item - Active
className="text-sm text-gray-900 dark:text-white font-medium"

// Breadcrumb Link
className="text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"

// Breadcrumb Separator (ChevronRight from lucide-react)
className="text-gray-400 dark:text-gray-600 w-4 h-4 mx-1"**WCAG Compliance**: All breadcrumb items meet 4.5:1 contrast ratio. Links are clearly distinguishable.

### Pagination Component

Pagination controls allow users to navigate through multiple pages of content.

#### Light Theme

| Element | State | Background | Text | Border | Icon | Hex Codes |
|---------|-------|------------|------|--------|------|-----------|
| Container | Default | Transparent | - | - | - | - |
| Page Button | Default | White | Gray-700 | Gray-300 | Gray-600 | `#ffffff` / `#374151` / `#d1d5db` / `#4b5563` |
| Page Button | Hover | Gray-50 | Gray-900 | Gray-400 | Gray-700 | `#f9fafb` / `#111827` / `#9ca3af` / `#374151` |
| Page Button | Active | Primary-500 | White | Primary-500 | White | `#34b7ff` / `#ffffff` / `#34b7ff` / `#ffffff` |
| Page Button | Disabled | White | Gray-400 | Gray-300 | Gray-400 | `#ffffff` / `#9ca3af` / `#d1d5db` / `#9ca3af` |
| Navigation Button | Default | White | Gray-700 | Gray-300 | Gray-600 | `#ffffff` / `#374151` / `#d1d5db` / `#4b5563` |
| Navigation Button | Hover | Gray-50 | Gray-900 | Gray-400 | Gray-700 | `#f9fafb` / `#111827` / `#9ca3af` / `#374151` |
| Navigation Button | Disabled | White | Gray-400 | Gray-300 | Gray-400 | `#ffffff` / `#9ca3af` / `#d1d5db` / `#9ca3af` |

#### Dark Theme

| Element | State | Background | Text | Border | Icon | Hex Codes |
|---------|-------|------------|------|--------|------|-----------|
| Container | Default | Transparent | - | - | - | - |
| Page Button | Default | Dark-bg-secondary | Gray-300 | Gray-700 | Gray-400 | `#0a1a2e` / `#d1d5db` / `#374151` / `#9ca3af` |
| Page Button | Hover | Gray-800 | White | Gray-600 | Gray-300 | `#1f2937` / `#ffffff` / `#4b5563` / `#d1d5db` |
| Page Button | Active | Primary-500 | White | Primary-500 | White | `#34b7ff` / `#ffffff` / `#34b7ff` / `#ffffff` |
| Page Button | Disabled | Dark-bg-secondary | Gray-600 | Gray-700 | Gray-600 | `#0a1a2e` / `#4b5563` / `#374151` / `#4b5563` |
| Navigation Button | Default | Dark-bg-secondary | Gray-300 | Gray-700 | Gray-400 | `#0a1a2e` / `#d1d5db` / `#374151` / `#9ca3af` |
| Navigation Button | Hover | Gray-800 | White | Gray-600 | Gray-300 | `#1f2937` / `#ffffff` / `#4b5563` / `#d1d5db` |
| Navigation Button | Disabled | Dark-bg-secondary | Gray-600 | Gray-700 | Gray-600 | `#0a1a2e` / `#4b5563` / `#374151` / `#4b5563` |

#### Tailwind Classes

```tsx
// Pagination Container
className="flex items-center justify-center space-x-1"

// Page Button - Default
className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"

// Page Button - Active
className="px-3 py-2 text-sm font-medium text-white bg-primary-500 border-primary-500 rounded-lg"

// Page Button - Disabled
className="px-3 py-2 text-sm font-medium text-gray-400 dark:text-gray-600 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-gray-700 rounded-lg cursor-not-allowed opacity-50"

// Navigation Button (ChevronLeft/ChevronRight from lucide-react)
className="p-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"**WCAG Compliance**: All pagination buttons meet 4.5:1 contrast ratio. Active page is clearly indicated with primary color.

### Accordion Component

Accordions allow users to expand and collapse sections of content.

#### Light Theme

| Element | State | Background | Text | Icon | Border | Hex Codes |
|---------|-------|------------|------|------|--------|-----------|
| Accordion Item | Default | White | Gray-900 | Gray-600 | Gray-200 | `#ffffff` / `#111827` / `#4b5563` / `#e5e7eb` |
| Accordion Header | Default | White | Gray-900 | Gray-600 | Gray-200 (bottom) | `#ffffff` / `#111827` / `#4b5563` / `#e5e7eb` |
| Accordion Header | Hover | Gray-50 | Gray-900 | Gray-700 | Gray-200 (bottom) | `#f9fafb` / `#111827` / `#374151` / `#e5e7eb` |
| Accordion Header | Expanded | White | Primary-500 | Primary-500 | Gray-200 (bottom) | `#ffffff` / `#34b7ff` / `#34b7ff` / `#e5e7eb` |
| Accordion Content | Default | White | Gray-700 | - | - | `#ffffff` / `#374151` |
| Accordion Icon | Default | Transparent | Gray-600 | Gray-600 | - | `#4b5563` / `#4b5563` |
| Accordion Icon | Expanded | Transparent | Primary-500 | Primary-500 | - | `#34b7ff` / `#34b7ff` |

#### Dark Theme

| Element | State | Background | Text | Icon | Border | Hex Codes |
|---------|-------|------------|------|------|--------|-----------|
| Accordion Item | Default | Dark-bg-secondary | White | Gray-400 | Gray-700 | `#0a1a2e` / `#ffffff` / `#9ca3af` / `#374151` |
| Accordion Header | Default | Dark-bg-secondary | White | Gray-400 | Gray-700 (bottom) | `#0a1a2e` / `#ffffff` / `#9ca3af` / `#374151` |
| Accordion Header | Hover | Gray-800 | White | Gray-300 | Gray-700 (bottom) | `#1f2937` / `#ffffff` / `#d1d5db` / `#374151` |
| Accordion Header | Expanded | Dark-bg-secondary | Primary-500 | Primary-500 | Gray-700 (bottom) | `#0a1a2e` / `#34b7ff` / `#34b7ff` / `#374151` |
| Accordion Content | Default | Dark-bg-secondary | Gray-300 | - | - | `#0a1a2e` / `#d1d5db` |
| Accordion Icon | Default | Transparent | Gray-400 | Gray-400 | - | `#9ca3af` / `#9ca3af` |
| Accordion Icon | Expanded | Transparent | Primary-500 | Primary-500 | - | `#34b7ff` / `#34b7ff` |

#### Tailwind Classes

```tsx
// Accordion Item
className="bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"

// Accordion Header
className="w-full px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white bg-white dark:bg-dark-bg-secondary hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between transition-colors"

// Accordion Header - Expanded
className="w-full px-4 py-3 text-left text-sm font-medium text-primary-500 bg-white dark:bg-dark-bg-secondary border-b border-gray-200 dark:border-gray-700 flex items-center justify-between"

// Accordion Content
className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"

// Accordion Icon (ChevronDown from lucide-react)
className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform"

// Accordion Icon - Expanded
className="w-5 h-5 text-primary-500 transition-transform rotate-180"**WCAG Compliance**: All accordion items meet 4.5:1 contrast ratio. Expanded state is clearly indicated with primary color.

## Color Usage Guidelines

### Consistency Rules

1. **Always use theme-aware classes**: Every component must include both light and dark mode variants
2. **Follow state hierarchy**: Default → Hover → Active → Focus → Disabled
3. **Maintain contrast**: All text must meet WCAG 2.1 AA standards (4.5:1 for normal text)
4. **Use semantic colors**: Success (green), Error (red), Warning (yellow), Info (blue)
5. **Preserve brand colors**: Primary blue (`#34b7ff`) for active states and accents

### Implementation Checklist

When implementing any component:

- [ ] Include both light and dark theme colors
- [ ] Define all interactive states (hover, active, focus, disabled)
- [ ] Ensure WCAG contrast compliance
- [ ] Use Tailwind classes from specifications
- [ ] Test in both themes
- [ ] Verify focus indicators are visible
- [ ] Check disabled states are distinguishable

