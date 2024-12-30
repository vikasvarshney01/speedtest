export default async function handler(req, res) {
    const start = Date.now();
    let dataSize = 0;
  
    req.on('data', (chunk) => {
      dataSize += chunk.length;
    });
  
    req.on('end', () => {
      const timeTaken = Date.now() - start; // Time in ms
      const speedMbps = (dataSize * 8) / (timeTaken * 1000); // Mbps
      res.status(200).json({ uploadSpeed: speedMbps });
    });
  }
  