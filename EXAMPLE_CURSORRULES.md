# Example .cursorrules Configuration for Other Projects

This is an example `.cursorrules` file that other projects can use to integrate with the unified documentation.

## Complete Example

```markdown
# Cursor AI Rules for [Your Project Name]

## Unified Development Documentation

This project follows the unified development approach documented at:
DOCS_API_URL=https://your-domain.com/api/docs
DOCS_API_KEY=a02cb62a06c3df3dc7635bbdc2e79d5e9c325bfdbe0f24a6616bcd8ee8c6ede2

## Documentation Reference

When developing, always reference the unified documentation:

### Development Patterns
- **Frontend Development**: ${DOCS_API_URL}/FRONTEND_DEVELOPMENT.md?key=${DOCS_API_KEY}
- **Project Structure**: ${DOCS_API_URL}/PROJECT_STRUCTURE.md?key=${DOCS_API_KEY}
- **Best Practices**: ${DOCS_API_URL}/BEST_PRACTICES.md?key=${DOCS_API_KEY}

### Styling & Design
- **UI Design**: ${DOCS_API_URL}/UI_DESIGN.md?key=${DOCS_API_KEY}
- **Styling Guidelines**: ${DOCS_API_URL}/STYLING_GUIDELINES.md?key=${DOCS_API_KEY}

### Technical Implementation
- **Tech Stack**: ${DOCS_API_URL}/TECH_STACK.md?key=${DOCS_API_KEY}
- **Routing**: ${DOCS_API_URL}/ROUTING.md?key=${DOCS_API_KEY}
- **State Management**: ${DOCS_API_URL}/STATE_MANAGEMENT.md?key=${DOCS_API_KEY}
- **Testing**: ${DOCS_API_URL}/TESTING.md?key=${DOCS_API_KEY}
- **Deployment**: ${DOCS_API_URL}/DEPLOYMENT.md?key=${DOCS_API_KEY}

### Development Tools
- **Cursor Best Practices**: ${DOCS_API_URL}/CURSOR_BEST_PRACTICES.md?key=${DOCS_API_KEY}

## Development Rules

1. **Always Follow Unified Patterns**: Reference unified documentation before implementing features
2. **Component Architecture**: Use patterns from FRONTEND_DEVELOPMENT.md
3. **Styling**: Follow STYLING_GUIDELINES.md for all styling decisions
4. **Project Structure**: Follow PROJECT_STRUCTURE.md for file organization
5. **Best Practices**: Apply BEST_PRACTICES.md in all development work
6. **Tech Stack**: Use TECH_STACK.md for dependency and configuration decisions
7. **Documentation First**: Update documentation before writing code (see CURSOR_BEST_PRACTICES.md)
8. **Latest Packages**: Always use latest stable versions (see TECH_STACK.md)

## README.md Rules

### Rules for README.md

1. **Always Read README.md First**
   - README.md is the primary source of project information
   - Always read README.md when starting work on this project
   - Use README.md to understand:
     - Project structure and organization
     - Tech stack and dependencies
     - Quick start instructions
     - Key features and capabilities
     - Documentation structure and links
     - Development guidelines

2. **Reference README.md for Information**
   - When users ask about project details, reference README.md
   - Quote or reference specific sections from README.md
   - Use README.md as the authoritative source for project information
   - Do not recreate or summarize README.md content - reference it directly
```

## Usage Instructions

1. Copy this example to your project's `.cursorrules` file
2. Replace `[Your Project Name]` with your actual project name
3. Replace `https://your-domain.com` with your actual deployment domain
4. Verify the API key is correct (see `API_KEY.txt`)
5. Customize additional rules as needed for your project

## Notes

- The API key provides read-only access to documentation
- All documentation files are accessible via the API
- Cursor AI will automatically reference these files during development
- Update the API URL when deploying to production

For more details, see [DOCS_INTEGRATION_GUIDE.md](DOCS_INTEGRATION_GUIDE.md).

