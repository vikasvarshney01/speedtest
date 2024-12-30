document.getElementById('runTest').addEventListener('click', async () => {
    document.getElementById('latency').textContent = 'Testing...';
    document.getElementById('downloadSpeed').textContent = 'Testing...';
    document.getElementById('uploadSpeed').textContent = 'Testing...';
  
    try {
      // Measure latency
      const latencyStart = performance.now();
      const latencyResponse = await fetch('/api/latency');
      const latencyEnd = performance.now();
      const latencyData = await latencyResponse.json();
      const latency = (latencyEnd - latencyStart).toFixed(2);
      document.getElementById('latency').textContent = `${latency} ms`;
  
      // Measure download speed
      const downloadStart = performance.now();
      const downloadResponse = await fetch('/api/download');
      const downloadBlob = await downloadResponse.blob(); // Consume the data
      const downloadEnd = performance.now();
      const downloadTime = (downloadEnd - downloadStart) / 1000; // Time in seconds
      const downloadSpeed = (downloadBlob.size * 8) / (1024 * 1024 * downloadTime); // Speed in Mbps
      document.getElementById('downloadSpeed').textContent = `${downloadSpeed.toFixed(2)} Mbps`;
  
      // Measure upload speed
      const uploadStart = performance.now();
      const uploadData = new Blob([new ArrayBuffer(2 * 1024 * 1024)]); // 2 MB data
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });
      const uploadEnd = performance.now();
      const uploadResult = await uploadResponse.json();
      const uploadSpeed = uploadResult.uploadSpeed || 'Error';
  
      if (typeof uploadSpeed === 'string') {
        document.getElementById('uploadSpeed').textContent = uploadSpeed;
      } else {
        document.getElementById('uploadSpeed').textContent = `${uploadSpeed.toFixed(2)} Mbps`;
      }
    } catch (error) {
      console.error('Error during test:', error);
      document.getElementById('latency').textContent = 'Error';
      document.getElementById('downloadSpeed').textContent = 'Error';
      document.getElementById('uploadSpeed').textContent = 'Error';
    }
  });
  