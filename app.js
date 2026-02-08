/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Hostinger Passenger Entry Point
 * 
 * This file is the entry point for Hostinger's Passenger application server.
 * It runs the Next.js standalone server with the PORT provided by the environment.
 * 
 * IMPORTANT: After deployment, the .next/standalone/server.js is used.
 * This file bootstraps that server with the correct configuration.
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Change to the app directory
const appDir = __dirname;
process.chdir(appDir);

// Get port from environment (Hostinger provides this)
const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || '0.0.0.0';

// Set production environment
process.env.NODE_ENV = 'production';
process.env.PORT = port;
process.env.HOSTNAME = hostname;

// Possible paths to the standalone server (handles monorepo structure)
const possiblePaths = [
  path.join(appDir, '.next', 'standalone', 'apps', 'web', 'server.js'),  // Monorepo structure
  path.join(appDir, '.next', 'standalone', 'server.js'),                   // Standard structure
];

// Find the standalone server path
let standaloneServerPath = null;
for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    standaloneServerPath = p;
    break;
  }
}

if (standaloneServerPath) {
  // Get the standalone directory for this path
  const standaloneDir = path.dirname(standaloneServerPath);
  
  // Source directories for static and public files
  const staticSrc = path.join(appDir, '.next', 'static');
  const publicSrc = path.join(appDir, 'public');
  
  // Destination directories in standalone
  const staticDest = path.join(standaloneDir, '.next', 'static');
  const publicDest = path.join(standaloneDir, 'public');

  // Ensure static files are in standalone directory
  if (fs.existsSync(staticSrc) && !fs.existsSync(staticDest)) {
    console.log('Copying static files...');
    fs.cpSync(staticSrc, staticDest, { recursive: true });
  }

  // Ensure public files are in standalone directory  
  if (fs.existsSync(publicSrc) && !fs.existsSync(publicDest)) {
    console.log('Copying public files...');
    fs.cpSync(publicSrc, publicDest, { recursive: true });
  }

  // Change to standalone directory and run the server
  process.chdir(standaloneDir);
  
  console.log(`Starting Next.js standalone server on port ${port}...`);
  console.log(`Server path: ${standaloneServerPath}`);
  require(standaloneServerPath);
} else {
  // Fallback: Use next start if standalone not available
  console.log(`Standalone server not found. Using next start on port ${port}...`);
  
  const nextBin = path.join(appDir, 'node_modules', '.bin', 'next');
  
  if (process.platform === 'win32') {
    spawn('cmd', ['/c', nextBin, 'start', '-p', port.toString(), '-H', hostname], {
      stdio: 'inherit',
      cwd: appDir,
      env: { ...process.env, NODE_ENV: 'production' }
    });
  } else {
    spawn(nextBin, ['start', '-p', port.toString(), '-H', hostname], {
      stdio: 'inherit',
      cwd: appDir,
      env: { ...process.env, NODE_ENV: 'production' }
    });
  }
}
