document.getElementById('runTest').addEventListener('click', async () => {
    document.getElementById('latency').textContent = 'Testing...';
    document.getElementById('downloadSpeed').textContent = 'Testing...';
    document.getElementById('uploadSpeed').textContent = 'Testing...';
  
    try {
      // Latency Test
      const latencyStart = performance.now();
      await fetch('/api/latency');
      const latencyEnd = performance.now();
      const latency = (latencyEnd - latencyStart).toFixed(2);
      document.getElementById('latency').textContent = `${latency} ms`;
  
      // Download Speed Test
      const downloadStart = performance.now();
      const downloadResponse = await fetch('/api/download');
      const downloadBlob = await downloadResponse.blob();
      const downloadEnd = performance.now();
      const downloadTime = (downloadEnd - downloadStart) / 1000; // seconds
      const downloadSpeed = (downloadBlob.size * 8) / (1024 * 1024 * downloadTime); // Mbps
      document.getElementById('downloadSpeed').textContent = `${downloadSpeed.toFixed(2)} Mbps`;
  
      // Upload Speed Test
      const uploadStart = performance.now();
      const uploadData = new Blob([new ArrayBuffer(5 * 1024 * 1024)]); // 2 MB
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
        headers:{
            'Content-Type':'application/octet-stream'
        }
      });
      const uploadEnd = performance.now();
      const uploadResult = await uploadResponse.json();
  
      if (uploadResult.uploadSpeed) {
        document.getElementById('uploadSpeed').textContent = `${uploadResult.uploadSpeed.toFixed(2)} Mbps`;
      } else {
        document.getElementById('uploadSpeed').textContent = 'Error';
      }
    } catch (error) {
      console.error('Error during speed test:', error);
      document.getElementById('latency').textContent = 'Error';
      document.getElementById('downloadSpeed').textContent = 'Error';
      document.getElementById('uploadSpeed').textContent = 'Error';
    }
  });
  