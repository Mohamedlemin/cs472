import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;

function sendFile(res, filePath, contentType) {
  fs.readFile(path.join(__dirname, filePath), (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.setHeader('Content-Type', contentType);
      res.send(data);
    }
  });
}

app.get('/image', (req, res) => {
  sendFile(res, 'path/to/image.jpg', 'image/jpeg');
});

app.get('/pdf', (req, res) => {
  sendFile(res, 'path/to/document.pdf', 'application/pdf');
});

app.get('/about', (req, res) => {
  sendFile(res, 'path/to/about.txt', 'text/plain');
});

app.get(['/', '/home'], (req, res) => {
  res.send('Welcome to my website');
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});