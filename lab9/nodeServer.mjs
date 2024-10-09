import http from 'http';
import fs from 'fs';
import path from 'path';

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    switch (req.url) {
      case '/image':
        sendFile(res, 'path/to/image.jpg', 'image/jpeg');
        break;
      case '/pdf':
        sendFile(res, 'path/to/document.pdf', 'application/pdf');
        break;
      case '/about':
        sendFile(res, 'path/to/about.txt', 'text/plain');
        break;
      case '/':
      case '/home':
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to my website');
        break;
      default:
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

function sendFile(res, filePath, contentType) {
  fs.readFile(path.join(__dirname, filePath), (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

server.listen(3000, () => console.log('Server running on port 3000'));