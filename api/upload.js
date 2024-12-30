export default async function handler(req, res) {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }
  
    const startTime = Date.now();
    let totalSize = 0;
  
    req.on('data', (chunk) => {
      totalSize += chunk.length; // Accumulate the size of the uploaded data
    });
  
    req.on('end', () => {
      const endTime = Date.now();
      const durationSeconds = (endTime - startTime) / 1000; // Convert duration to seconds
      const uploadSpeed = (totalSize * 8) / (durationSeconds * 1024 * 1024); // Calculate speed in Mbps
  
      if (isNaN(uploadSpeed)) {
        res.status(500).json({ error: 'Upload speed calculation failed' });
      } else {
        res.status(200).json({ uploadSpeed });
      }
    });
  
    req.on('error', (err) => {
      res.status(500).json({ error: 'An error occurred while receiving data', details: err.message });
    });
  }
  