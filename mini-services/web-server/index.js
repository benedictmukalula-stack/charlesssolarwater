import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { join, extname } from 'path';

const PORT = 3000;
const STATIC_DIR = '/home/z/my-project/.next/server/app';
const PUBLIC_DIR = '/home/z/my-project/public';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = createServer((req, res) => {
  // Serve the built HTML for /
  if (req.url === '/' || req.url === '') {
    const htmlPath = join(STATIC_DIR, 'index.html');
    if (existsSync(htmlPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(readFileSync(htmlPath));
      return;
    }
  }

  // Serve static files from public
  const publicPath = join(PUBLIC_DIR, req.url);
  if (existsSync(publicPath) && !req.url.endsWith('/')) {
    const ext = extname(publicPath);
    const mime = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(readFileSync(publicPath));
    return;
  }

  // Serve Next.js static chunks
  if (req.url.startsWith('/_next/')) {
    const cleanUrl = req.url.replace(/\?\w*$/, '');
    const nextPath = join('/home/z/my-project/.next', cleanUrl);
    if (existsSync(nextPath)) {
      const ext = extname(nextPath);
      const mime = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': mime });
      res.end(readFileSync(nextPath));
      return;
    }
  }

  // API routes
  if (req.url.startsWith('/api/')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    if (req.url === '/api/contact' && req.method === 'POST') {
      let body = '';
      req.on('data', c => body += c);
      req.on('end', () => {
        res.end(JSON.stringify({ success: true, message: 'Inquiry received.' }));
      });
      return;
    }
    if (req.url === '/api/chat' && req.method === 'POST') {
      let body = '';
      req.on('data', c => body += c);
      req.on('end', () => {
        res.end(JSON.stringify({ success: true, response: 'AI assistant coming soon. Please use WhatsApp for immediate assistance.' }));
      });
      return;
    }
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Lightweight server running on port ${PORT}`);
});

// Keep process alive
setInterval(() => {}, 60000);
