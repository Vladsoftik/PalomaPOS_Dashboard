# Deployment

## Overview

This document outlines universal deployment process, environment setup, and build configuration for React + Vite + TypeScript projects.

## Build Process

### Production Build

Create an optimized production build:

```bash
npm run build
```

This command:
- Compiles TypeScript
- Bundles and minifies code
- Optimizes assets
- Generates source maps (if configured)
- Creates production-ready output in `dist/`

### Build Output

The build process creates:

```
dist/
├── index.html          # Entry HTML file
├── assets/
│   ├── index-[hash].js    # JavaScript bundle
│   ├── index-[hash].css   # CSS bundle
│   └── [other assets]     # Other static assets
```

## Environment Configuration

### Environment Variables

Configure environment variables for different environments:

#### Development (.env.development)

```env
VITE_APP_TITLE=Application Name (Dev)
VITE_API_URL=http://localhost:3000/api
```

#### Production (.env.production)

```env
VITE_APP_TITLE=Application Name
VITE_API_URL=https://api.example.com
```

### Environment Variable Usage

Access environment variables in code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL
const appTitle = import.meta.env.VITE_APP_TITLE
```

**Note**: Variables must be prefixed with `VITE_` to be exposed to client code.

## Build Optimization

### Code Splitting

Vite automatically splits code by route:

```tsx
// Routes are automatically code-split
import { lazy } from 'react'

const Settings = lazy(() => import('./pages/Settings'))
```

### Asset Optimization

- **Images**: Optimize images before adding to project
- **Fonts**: Use web fonts efficiently
- **CSS**: Purged unused CSS (Tailwind handles this)

### Bundle Analysis

Analyze bundle size:

```bash
npm run build -- --analyze
```

## Deployment Options

### Static Hosting

Deploy to static hosting services:

#### Vercel

1. Connect repository to Vercel
2. Configure build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push

#### Netlify

1. Connect repository to Netlify
2. Configure build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push

#### GitHub Pages

1. Build the project: `npm run build`
2. Configure GitHub Actions for deployment
3. Deploy `dist/` folder to `gh-pages` branch

### Traditional Hosting

Deploy to traditional web servers:

1. Build the project: `npm run build`
2. Upload `dist/` folder to web server
3. Configure web server to serve `index.html` for all routes
4. Set up HTTPS (recommended)

## Server Configuration

### Nginx Configuration

Example Nginx configuration:

```nginx
server {
    listen 80;
    server_name example.com;
    
    root /var/www/application/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /assets {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Apache Configuration

Example Apache `.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
          
      - name: Deploy
        # Add deployment steps here
```

## Pre-Deployment Checklist

### Before Deployment

- [ ] All tests pass (`npm run test`)
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors or warnings
- [ ] Environment variables configured
- [ ] API endpoints configured
- [ ] HTTPS configured (if applicable)
- [ ] Error tracking configured (if applicable)
- [ ] Analytics configured (if applicable)

### Build Verification

1. **Test Production Build Locally**:
   ```bash
   npm run build
   npm run preview
   ```

2. **Verify**:
   - All routes work correctly
   - Assets load properly
   - Dark mode works
   - No console errors
   - Performance is acceptable

## Post-Deployment

### Monitoring

- Monitor error rates
- Check performance metrics
- Verify user experience
- Monitor API calls

### Rollback Plan

Have a rollback plan in case of issues:

1. Keep previous build artifacts
2. Document rollback procedure
3. Test rollback process
4. Have backup deployment ready

## Performance Optimization

### Build Optimizations

- **Minification**: Enabled by default in Vite
- **Tree Shaking**: Automatic removal of unused code
- **Code Splitting**: Automatic route-based splitting
- **Asset Optimization**: Optimize images and fonts

### Runtime Optimizations

- **Lazy Loading**: Lazy load routes and components
- **Memoization**: Use React.memo and hooks appropriately
- **Image Optimization**: Use appropriate image formats
- **Caching**: Configure appropriate cache headers

## Security Considerations

### Security Headers

Configure security headers:

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

### HTTPS

Always use HTTPS in production:

- Configure SSL certificate
- Redirect HTTP to HTTPS
- Use secure cookies (if applicable)

## Environment-Specific Configuration

### Development

- Hot module replacement
- Source maps enabled
- Verbose error messages
- Development API endpoints

### Production

- Optimized builds
- Minified code
- Production API endpoints
- Error tracking
- Analytics

## Summary

Deployment provides:

- **Build Process** - Optimized production builds
- **Environment Configuration** - Environment-specific settings
- **Deployment Options** - Multiple hosting options
- **Server Configuration** - Web server setup
- **CI/CD** - Automated deployment pipelines
- **Performance** - Optimized builds and runtime
- **Security** - Security headers and HTTPS

