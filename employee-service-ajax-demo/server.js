const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const employees = [
  { id: 1, name: 'Alice Johnson', role: 'Developer', salary: 85000 },
  { id: 2, name: 'Brian Smith', role: 'Designer', salary: 76000 },
  { id: 3, name: 'Chloe Brown', role: 'Tester', salary: 71000 },
  { id: 4, name: 'David Wilson', role: 'Manager', salary: 98000 }
];

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data, null, 2));
}

function serveStaticFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        sendJson(res, 404, { message: 'File not found' });
      } else {
        sendJson(res, 500, { message: 'Server error' });
      }
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    const contentType = contentTypes[extension] || 'text/plain; charset=utf-8';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  if (requestUrl.pathname === '/api/employees') {
    sendJson(res, 200, employees);
    return;
  }

  let filePath = path.join(ROOT, 'browser-demo', requestUrl.pathname);

  if (requestUrl.pathname === '/' || requestUrl.pathname === '/index.html') {
    filePath = path.join(ROOT, 'browser-demo', 'index.html');
  }

  if (!filePath.startsWith(path.join(ROOT, 'browser-demo'))) {
    sendJson(res, 403, { message: 'Forbidden' });
    return;
  }

  serveStaticFile(res, filePath);
});

server.listen(PORT, () => {
  console.log(`Employee service is running at http://localhost:${PORT}`);
  console.log('Use /api/employees to fetch employee data');
});

module.exports = server;
