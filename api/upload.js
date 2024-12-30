export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    let totalSize = 0;
    const startTime = Date.now();
  
    req.on('data', (chunk) => {
      totalSize += chunk.length;
    });
  
    req.on('end', () => {
      const endTime = Date.now();
      const durationSeconds = (endTime - startTime) / 1000;
  
      if (totalSize === 0 || durationSeconds === 0) {
        return res.status(400).json({ error: 'No data received' });
      }
  
      const uploadSpeed = (totalSize * 8) / (1024 * 1024 * durationSeconds); // Mbps
      return res.status(200).json({ uploadSpeed });
    });
  
    req.on('error', (err) => {
      return res.status(500).json({ error: err.message });
    });
  }
  