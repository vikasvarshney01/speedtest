export default function handler(req, res) {
    const sizeInBytes = 5 * 1024 * 1024; // 5 MB file
    const data = Buffer.alloc(sizeInBytes, 'a'); // Create a buffer filled with dummy data
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Length', sizeInBytes);
    res.end(data);
  }
  