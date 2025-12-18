# Vercel Deployment Guide

## Overview

This project is configured for deployment on Vercel. The configuration ensures proper routing, caching, and build optimization.

## Configuration Files

### vercel.json

The `vercel.json` file contains:
- **Build Command**: `npm run build`
- **Output Directory**: `dist` (Vite's default output)
- **Framework**: Vite (auto-detected)
- **Rewrites**: All routes redirect to `index.html` for SPA routing
- **Headers**: Cache control for static assets

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your Git repository

2. **Configure Project**
   - Framework Preset: **Vite** (auto-detected)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
   - Install Command: `npm install` (auto-detected)

3. **Environment Variables** (if needed)
   - Add any `VITE_*` environment variables in the Vercel dashboard
   - These will be available during build time

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your project

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Production Deployment**
   ```bash
   vercel --prod
   ```

## Build Configuration

### Build Process

The build process:
1. Installs dependencies (`npm install`)
2. Runs TypeScript compilation (`tsc`)
3. Builds the Vite project (`vite build`)
4. Outputs to `dist/` directory

### Build Output

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other assets]
```

## Routing Configuration

### SPA Routing

The `vercel.json` includes rewrites to handle client-side routing:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures all routes are handled by the React application.

## Caching Configuration

### Static Assets

Static assets are cached for 1 year:

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Environment Variables

### Setting Environment Variables

1. **Via Vercel Dashboard**:
   - Go to Project Settings → Environment Variables
   - Add variables with `VITE_` prefix
   - Redeploy after adding variables

2. **Via Vercel CLI**:
   ```bash
   vercel env add VITE_API_URL
   ```

### Available Environments

- **Production**: Used for production deployments
- **Preview**: Used for preview deployments (PRs, branches)
- **Development**: Used for local development with `vercel dev`

## Automatic Deployments

### Git Integration

Vercel automatically deploys:
- **Production**: Pushes to main/master branch
- **Preview**: Pull requests and other branches

### Deployment Status

- Check deployment status in Vercel dashboard
- View build logs for debugging
- Access preview URLs for PRs

## Custom Domain

### Adding a Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificate is automatically provisioned

## Troubleshooting

### Build Failures

1. **Check Build Logs**: View detailed logs in Vercel dashboard
2. **Test Locally**: Run `npm run build` locally to identify issues
3. **Check Dependencies**: Ensure all dependencies are in `package.json`

### Routing Issues

1. **Verify vercel.json**: Ensure rewrites are configured correctly
2. **Check Base Path**: Ensure Vite base path is `/` (default)

### Environment Variables

1. **Check Prefix**: Variables must start with `VITE_` to be exposed
2. **Redeploy**: Changes to environment variables require redeployment
3. **Verify Values**: Check variable values in Vercel dashboard

## Performance Optimization

### Build Optimizations

- Vite automatically optimizes builds
- Code splitting is enabled
- Assets are minified and compressed

### Runtime Optimizations

- Vercel CDN provides global distribution
- Automatic HTTPS
- Edge network for fast delivery

## Monitoring

### Analytics

- View deployment analytics in Vercel dashboard
- Monitor build times and success rates
- Track performance metrics

### Logs

- Access function logs (if using serverless functions)
- View build logs for debugging
- Monitor error rates

## Rollback

### Rolling Back Deployments

1. Go to Deployments in Vercel dashboard
2. Find the previous successful deployment
3. Click "Promote to Production"

## Best Practices

1. **Environment Variables**: Use Vercel dashboard for sensitive values
2. **Preview Deployments**: Test in preview before promoting to production
3. **Monitoring**: Regularly check deployment status and logs
4. **Custom Domains**: Use custom domains for production
5. **HTTPS**: Always use HTTPS (automatically enabled by Vercel)

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)

