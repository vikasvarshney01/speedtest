export default function handler(req, res) {
    const buffer = Buffer.alloc(5 * 1024 * 1024); // 5 MB file
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Length', buffer.length);
    res.status(200).send(buffer);
  }
  