export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    let totalSize = 0; // Total uploaded size in bytes
    const startTime = Date.now(); // Record the start time
  
    // Listen for data chunks
    req.on('data', (chunk) => {
      totalSize += chunk.length;
    });
  
    req.on('end', () => {
      const endTime = Date.now(); // Record the end time
      const durationSeconds = (endTime - startTime) / 1000; // Calculate duration in seconds
  
      if (durationSeconds === 0 || totalSize === 0) {
        return res.status(400).json({ error: 'No data received or invalid request' });
      }
  
      const uploadSpeed = (totalSize * 8) / (1024 * 1024 * durationSeconds); // Calculate upload speed in Mbps
      return res.status(200).json({ uploadSpeed });
    });
  
    req.on('error', (err) => {
      return res.status(500).json({ error: 'Error during upload', details: err.message });
    });
  }
  