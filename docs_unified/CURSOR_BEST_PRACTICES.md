# Cursor Best Practices

## Overview

This document outlines universal best practices for working with Cursor AI in React + Vite + TypeScript projects. These practices ensure efficient development, maintain code quality, and leverage Cursor's AI capabilities effectively.

## ⚠️ MANDATORY Pre-Code Checklist

### CRITICAL: Complete This Checklist BEFORE Writing Any Code

**This checklist is MANDATORY and must be completed before ANY code changes.**

#### Step 1: Identify Documentation Requirements

Before writing code, identify which documentation files need updating:

- [ ] **For New Components**: Update `docs_unified/FRONTEND_DEVELOPMENT.md`
- [ ] **For UI Changes**: Update `docs_unified/UI_DESIGN.md` and `docs_unified/FRONTEND_DEVELOPMENT.md`
- [ ] **For Architecture Changes**: Update `docs_project/ARCHITECTURE.md` (project-specific)
- [ ] **For New Patterns**: Update `docs_unified/BEST_PRACTICES.md`

#### Step 2: Update Documentation FIRST

- [ ] Read existing relevant documentation sections
- [ ] Update documentation with new feature/component details
- [ ] Document purpose, behavior, and usage
- [ ] Include examples if applicable
- [ ] Verify documentation is complete and accurate

#### Step 3: Verify Documentation Completeness

- [ ] All relevant documentation files have been updated
- [ ] Documentation clearly describes the feature/component
- [ ] Documentation follows existing patterns and style
- [ ] No gaps or ambiguities in documentation

#### Step 4: Implement Code According to Documentation

- [ ] Code matches documented requirements
- [ ] Code follows documented patterns
- [ ] Implementation aligns with documentation

### What Happens If You Skip This Checklist?

**❌ INCORRECT WORKFLOW** (Will be rejected):
```
User: "Create a new UserForm component"
AI: [Immediately creates component code]
Result: Code exists but documentation is missing
```

**✅ CORRECT WORKFLOW** (Required):
```
User: "Create a new UserForm component"
AI: 
1. First: Updates docs_unified/FRONTEND_DEVELOPMENT.md to document the component
2. Then: Implements the component according to documentation
Result: Documentation and code are in sync
```

## Documentation-Driven Development

### ⚠️ CRITICAL RULE: Documentation First, Code Second

**This is a MANDATORY workflow for all changes in this project.**

When adding new features or making changes:

1. **ALWAYS update documentation FIRST**
   - Update relevant documentation files in `docs_unified/` or `docs_project/` BEFORE writing code
   - Document the feature requirements, structure, and behavior
   - This ensures the implementation matches the documented requirements

2. **THEN implement the code**
   - After documentation is updated, implement the feature according to the documentation
   - Code should follow the patterns and requirements documented

**Why Documentation First?**
- Ensures clear requirements before implementation
- Prevents code changes without documentation updates
- Maintains documentation as the single source of truth
- Helps Cursor AI understand requirements better
- Creates a clear contract between requirements and implementation

### Workflow Checklist

**Before writing any code, complete this checklist:**

- [ ] **Step 1**: Identify which documentation files need updating
- [ ] **Step 2**: Update documentation FIRST
  - Document the feature requirements
  - Document the structure and behavior
  - Document any new patterns or conventions
- [ ] **Step 3**: Review documentation
  - Ensure documentation is complete
  - Ensure documentation is clear and unambiguous
  - Ensure documentation follows existing patterns
- [ ] **Step 4**: Implement code according to documentation
  - Follow the documented requirements exactly
  - Use documented patterns and conventions
  - Reference documentation in code comments if needed
- [ ] **Step 5**: Verify implementation matches documentation
  - Check that code implements what was documented
  - Update documentation if implementation reveals gaps
  - Ensure documentation remains the source of truth

## Effective Prompting Strategies

### 1. Provide Context First

**✅ GOOD:**
```
I need to create a new user form. According to docs_unified/FRONTEND_DEVELOPMENT.md, 
I should use reusable components. The form should have:
- Username field (required)
- Email field (required)
- Status dropdown

Use the reusable Input and Select components from frontend/src/components/common/.
Follow the patterns in docs_unified/FRONTEND_DEVELOPMENT.md.
Ensure all text includes dark mode: text-gray-900 dark:text-white.
```

**❌ BAD:**
```
Create a user form.
```

### 2. Reference Existing Patterns

**✅ GOOD:**
```
Create a new Settings page similar to frontend/src/pages/Dashboard.tsx.
Use the same layout structure and follow the component patterns.
Add dark mode support for all text and containers.
```

**❌ BAD:**
```
Create a settings page.
```

### 3. Specify Component Requirements

**✅ GOOD:**
```
Create a form for editing user information. Use:
- Input component for text fields
- Select component for dropdowns
- Button component for actions
- Modal component to wrap the form
- Heading component for the title
- Text component for descriptions

All components are in frontend/src/components/common/.
```

**❌ BAD:**
```
Create a user edit form.
```

### 4. Include Dark Mode Requirements

**✅ GOOD:**
```
Update the dashboard page. Ensure all text elements include dark mode:
- Headings: text-gray-900 dark:text-white
- Body text: text-gray-900 dark:text-white
- Secondary text: text-gray-700 dark:text-gray-300
- Muted text: text-gray-600 dark:text-gray-400
- Containers: bg-white dark:bg-dark-bg-secondary
- Borders: border-gray-200 dark:border-gray-700

See docs_unified/UI_DESIGN.md for complete text color standards.
```

**❌ BAD:**
```
Update the dashboard.
```

## Code Generation Guidelines

### ⚠️ MANDATORY: Documentation First

**BEFORE writing any code, you MUST:**
1. Complete the [MANDATORY Pre-Code Checklist](#-mandatory-pre-code-checklist)
2. Update all relevant documentation files
3. Verify documentation is complete
4. ONLY THEN proceed with code implementation

**Code changes without documentation updates will be rejected.**

### ⚠️ CRITICAL: Use Only Latest Stable Packages

**MANDATORY RULE**: When installing or suggesting packages, ALWAYS use the **latest stable versions**. Never use outdated, deprecated, or old packages.

**When working with Cursor AI:**

1. **Always Specify Latest Stable**
   ```
   Install the latest stable version of [package]. Check npm registry 
   for the current latest stable version first.
   ```

2. **Verify Versions**
   ```
   Before installing [package], check the latest stable version using 
   'npm view [package] version' and install that version.
   ```

3. **Avoid Old Versions**
   ```
   ❌ Don't: "Install react@17.0.0"
   ✅ Do: "Install the latest stable version of react (check npm first)"
   ```

4. **Check for Deprecation**
   ```
   Check if [package] is deprecated. If so, find and use the recommended 
   alternative package instead.
   ```

**Package Installation Prompts:**

**✅ GOOD:**
```
I need to add form validation. Install the latest stable version of 
react-hook-form. Check npm registry for the current latest stable version 
first, then install it.
```

**❌ BAD:**
```
Install react-hook-form@7.0.0
```

**✅ GOOD:**
```
I need to add icons. Check what's the latest stable icon library for React, 
verify it's actively maintained, and install the latest stable version.
```

**❌ BAD:**
```
Install react-icons
```

### Component Development

**⚠️ REMINDER: Update documentation FIRST before creating components.**

**When creating new components:**

1. **Update documentation FIRST**
   ```
   I need to create a new [ComponentName] component. FIRST, update
   docs_unified/FRONTEND_DEVELOPMENT.md to document:
   - Component purpose and usage
   - Props and their types
   - Usage examples
   - Any special patterns or conventions
   THEN implement the component according to the documentation.
   ```

2. **Check for existing components first**
   ```
   Check if there's an existing component in frontend/src/components/common/
   that I can reuse or extend.
   ```

3. **Use reusable components**
   ```
   Create a new form component. Use Input, Select, Button, and Modal
   from frontend/src/components/common/. Do NOT use inline className
   patterns for form fields.
   ```

4. **Follow component patterns**
   ```
   Create a new feature component following the patterns in
   frontend/src/components/features/Users/UserForm.tsx.
   Use the same structure: Modal wrapper, form with reusable components,
   proper error handling.
   ```

### Form Development

**Standard form pattern:**

```
Create a form for [entity]. Requirements:
1. Use Modal component to wrap the form
2. Use Input, Textarea, Select components for fields
3. Use Button component for actions
4. Include dark mode for all text and backgrounds
5. Add proper error handling
6. Follow react-hook-form patterns if needed
7. Reference docs_unified/FRONTEND_DEVELOPMENT.md for component usage
```

### Page Development

**Standard page pattern:**

```
Create a new page for [feature]. Requirements:
1. Use Heading component for page title
2. Use Text component for descriptions
3. Include dark mode for all elements
4. Follow responsive design patterns
5. Reference existing pages like frontend/src/pages/Dashboard.tsx
```

## Common Patterns and Anti-Patterns

### ✅ DO: Use These Patterns

1. **Reference documentation**
   ```
   According to docs_unified/FRONTEND_DEVELOPMENT.md, [requirement]. Implement accordingly.
   ```

2. **Use existing components**
   ```
   Use the Input component from frontend/src/components/common/Input.tsx
   instead of creating inline input styles.
   ```

3. **Include dark mode**
   ```
   All text must include dark mode: text-gray-900 dark:text-white
   ```

4. **Follow component patterns**
   ```
   Follow the pattern from frontend/src/components/features/Users/UserForm.tsx
   for form components.
   ```

### ❌ DON'T: Avoid These Anti-Patterns

1. **Don't create inline styles**
   ```
   ❌ Don't: "Create an input with className='w-full px-4 py-2...'"
   ✅ Do: "Use the Input component from common/Input.tsx"
   ```

2. **Don't forget dark mode**
   ```
   ❌ Don't: "Add heading with text-gray-900"
   ✅ Do: "Add heading with text-gray-900 dark:text-white"
   ```

3. **Don't skip documentation**
   ```
   ❌ Don't: "Create user form"
   ✅ Do: "Create user form. Reference docs_unified/FRONTEND_DEVELOPMENT.md for
   component usage and docs_unified/UI_DESIGN.md for styling requirements"
   ```

4. **Don't create duplicate components**
   ```
   ❌ Don't: "Create a new button component"
   ✅ Do: "Use the Button component from common/Button.tsx"
   ```

## Troubleshooting

### Common Issues and Solutions

#### Issue: Cursor generates inline styles instead of components

**Solution:**
```
I need to refactor this code to use reusable components.
Replace all inline form field styles with Input, Textarea, Select components
from frontend/src/components/common/. See docs_unified/FRONTEND_DEVELOPMENT.md
for component usage examples.
```

#### Issue: Missing dark mode support

**Solution:**
```
Update all text elements in [file] to include dark mode variants:
- text-gray-900 dark:text-white for primary text
- text-gray-700 dark:text-gray-300 for secondary text
- text-gray-600 dark:text-gray-400 for muted text

Update all containers to include dark backgrounds:
- bg-white dark:bg-dark-bg-secondary
- border-gray-200 dark:border-gray-700

See docs_unified/UI_DESIGN.md for complete text color standards.
```

#### Issue: Component not found

**Solution:**
```
Check if the component exists in frontend/src/components/common/
or frontend/src/components/features/. If it doesn't exist, create it
following the patterns in docs_unified/FRONTEND_DEVELOPMENT.md.
```

### Getting Better Results from Cursor

1. **Provide more context**
   - Open related files before prompting
   - Reference specific documentation
   - Show examples of desired patterns

2. **Use iterative refinement**
   - Start with high-level request
   - Refine based on results
   - Ask for specific improvements

3. **Leverage codebase search**
   - Use Cursor's codebase search to find similar patterns
   - Reference existing implementations
   - Ask Cursor to analyze patterns

4. **Break down complex tasks**
   - Split large features into smaller prompts
   - Build incrementally
   - Test each step

## Example Workflows

### Creating a New Feature

**⚠️ CRITICAL: Steps 1-2 must be done FIRST before any code changes.**

```
Step 1: Understand requirements
"Read docs_project/ARCHITECTURE.md and docs_unified/FRONTEND_DEVELOPMENT.md to understand
the component structure and patterns."

Step 2: Update documentation FIRST
"I need to add [feature]. FIRST, update the relevant documentation files:
- docs_unified/FRONTEND_DEVELOPMENT.md if this involves new components
- docs_unified/UI_DESIGN.md if this involves styling changes
- docs_project/ARCHITECTURE.md if this changes system architecture

Document the feature requirements, structure, behavior, and any new patterns.
THEN proceed with implementation."

Step 3: Check existing patterns
"Find similar features in the codebase. Show me how [similar feature]
is implemented."

Step 4: Create components
"Create a form component for [entity] using reusable components.
Follow the pattern from [similar component].
Implement according to the documentation updated in Step 2."

Step 5: Add dark mode
"Ensure all text and containers in [file] include dark mode support."

Step 6: Verify documentation matches implementation
"Review the implementation and ensure it matches the documentation.
Update documentation if the implementation reveals any gaps."
```

### Refactoring Existing Code

```
Step 1: Identify what to refactor
"Analyze [file] and identify all inline styles that should be
replaced with reusable components."

Step 2: Replace components
"Replace all inline form field styles with Input, Textarea, Select
components from frontend/src/components/common/."

Step 3: Add dark mode
"Add dark mode variants to all text and container elements."

Step 4: Verify
"Review the refactored code to ensure it follows patterns in
docs_unified/FRONTEND_DEVELOPMENT.md."
```

## Summary

### Key Principles

1. **Always reference documentation** - Cursor works better with context
2. **Use reusable components** - Never create inline styles for form fields
3. **Include dark mode** - All text and containers need dark mode variants
4. **Follow existing patterns** - Reference similar implementations
5. **Update documentation** - Keep docs in sync with code
6. **Documentation first** - Always update docs before code
7. **Latest stable packages** - Always use latest stable versions, never old packages

### Quick Reference

- **Components**: `frontend/src/components/common/`
- **Unified Documentation**: `docs_unified/`
- **Project Documentation**: `docs_project/`
- **Component Patterns**: `docs_unified/FRONTEND_DEVELOPMENT.md`
- **UI Standards**: `docs_unified/UI_DESIGN.md`
- **Architecture**: `docs_project/ARCHITECTURE.md`

### Remember

- **Dark mode is required** for all text and containers
- **Use reusable components** - no inline styles for form fields
- **Documentation is your friend** - reference it in every prompt
- **Documentation first** - always update docs before code
- **Latest stable packages only** - never use old or deprecated packages

