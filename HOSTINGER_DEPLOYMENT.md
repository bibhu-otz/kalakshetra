# Hostinger Deployment Guide for Kalakshetra Odisha

This guide explains how to deploy the Kalakshetra Odisha Next.js application on Hostinger shared hosting with GitHub auto-deployment.

## Prerequisites

- Hostinger hosting plan with Node.js support
- GitHub repository with this project
- Domain configured in Hostinger

## Project Structure for Deployment

```
apps/web/
├── app.js              # Passenger entry point (required by Hostinger)
├── .htaccess           # Apache configuration for Passenger
├── .node-version       # Specifies Node.js 18
├── .nvmrc              # Alternative Node version file
├── package.json        # Updated with Hostinger-compatible scripts
├── next.config.mjs     # Configured with standalone output
└── ...
```

## Step-by-Step Deployment

### 1. Prepare Your GitHub Repository

Ensure all changes are committed and pushed to your GitHub repository:

```bash
git add .
git commit -m "Configure for Hostinger deployment"
git push origin main
```

### 2. Configure Hostinger hPanel

1. **Log in to Hostinger hPanel**
2. **Go to "Website" → "Auto-Deploy"** (or "Git" section)
3. **Connect GitHub:**
   - Click "Connect GitHub"
   - Authorize Hostinger to access your repositories
4. **Select Repository:**
   - Choose your `kalakshetra-platform` repository
   - Select the `main` branch
5. **Set the Deployment Path:**
   - Set to `public_html` (or your domain's document root)
   - **Important:** The web app is in `apps/web/`, so you may need to configure this

### 3. Configure Node.js Application

1. **Go to "Advanced" → "Node.js" in hPanel**
2. **Create Node.js Application:**
   - **Node.js Version:** 18.x or higher
   - **Application mode:** Production
   - **Application root:** `/apps/web` (relative to deployment path)
   - **Application URL:** Your domain
   - **Application startup file:** `app.js`
3. **Set Environment Variables:**
   ```
   NODE_ENV=production
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   NEXT_PUBLIC_STRAPI_URL=https://cms.kalakshetraodisha.com
   ```

### 4. Initial Deployment

After connecting GitHub:

1. **Click "Deploy"** or push to the main branch
2. **Wait for deployment** (first build may take 5-10 minutes)
3. **Check Logs:** In hPanel, check the deployment logs for errors

### 5. Post-Deployment Setup

If the build doesn't run automatically on deployment:

1. Access your server via **SSH** or **File Manager**
2. Navigate to `apps/web/` directory
3. Run manually:
   ```bash
   npm install
   npm run build
   ```

## How It Works

### package.json Scripts

```json
{
  "scripts": {
    "build": "next build",
    "start": "next start -p ${PORT:-3000}",
    "postinstall": "npm run build"
  }
}
```

- **build:** Creates production build with standalone output
- **start:** Starts the server on Hostinger's assigned PORT
- **postinstall:** Auto-builds after `npm install` (useful for auto-deploy)

### next.config.mjs

```javascript
output: 'standalone'
```

The `standalone` output creates a minimal deployment bundle that:
- Includes only necessary node_modules
- Creates a self-contained server
- Reduces deployment size significantly

### app.js (Passenger Entry Point)

Hostinger uses **Phusion Passenger** to run Node.js apps. The `app.js` file:
1. Receives the PORT from Passenger
2. Loads the Next.js standalone server
3. Copies static and public files if needed
4. Falls back to `next start` if standalone isn't available

## Environment Variables

Set these in Hostinger hPanel under Node.js application settings:

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | Yes | Set to `production` |
| `PORT` | Auto | Provided by Hostinger |
| `NEXT_PUBLIC_APP_URL` | Yes | Your production URL |
| `NEXT_PUBLIC_STRAPI_URL` | If using CMS | Strapi API URL |

## Troubleshooting

### Build Fails

1. Check Node.js version is 18+
2. Ensure all dependencies are in package.json
3. Check hPanel logs for specific errors

### Application Not Starting

1. Verify `app.js` is set as startup file
2. Check if `.next/standalone/server.js` exists
3. Restart the Node.js application in hPanel

### 502 Bad Gateway

1. Application might be starting up - wait 1-2 minutes
2. Check if port conflicts exist
3. Review Node.js application logs in hPanel

### Static Assets Not Loading

1. Ensure `.next/static` is copied during build
2. Check if `public/` folder exists
3. Verify .htaccess is in place

## GitHub Actions (Optional)

For automated testing before deployment, add `.github/workflows/deploy.yml`:

```yaml
name: Test and Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: cd apps/web && npm ci
      - run: cd apps/web && npm run lint
      - run: cd apps/web && npm run build
```

## Manual SSH Deployment

If auto-deploy doesn't work:

```bash
# SSH into Hostinger
ssh u123456789@your-server.hostinger.com

# Navigate to web app
cd public_html/apps/web

# Install and build
npm install --production=false
npm run build

# Restart the application
# (Use hPanel to restart Node.js app)
```

## Support

For issues:
1. Check Hostinger Node.js documentation
2. Review Next.js deployment guides
3. Check GitHub Actions logs (if configured)

---

**Note:** Hostinger shared hosting has resource limits. For high-traffic sites, consider upgrading to VPS or using Vercel/Railway for Next.js hosting.
