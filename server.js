/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Custom Node.js Server (Alternative to app.js)
 * 
 * Use this for non-Passenger environments or manual Node.js execution.
 * For Hostinger with Passenger, use app.js instead.
 */

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');

// Ensure we're running from the correct directory
process.chdir(__dirname);

// Load environment variables for production
if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: path.join(__dirname, '.env.production') });
}

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port, dir: __dirname });
const handle = app.getRequestHandler();

// Graceful shutdown handling
let server;

const shutdown = (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  if (server) {
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

app.prepare().then(() => {
  server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });

  server.listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`
┌─────────────────────────────────────────────┐
│                                             │
│   Kalakshetra Odisha                        │
│   Cultural Heritage Platform                │
│                                             │
│   Running at: http://${hostname}:${port}${' '.repeat(23 - String(port).length - hostname.length)}│
│   Environment: ${(process.env.NODE_ENV || 'development').padEnd(26)}│
│                                             │
└─────────────────────────────────────────────┘
    `);
  });
}).catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
