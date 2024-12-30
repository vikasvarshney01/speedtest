document.getElementById('runTest').addEventListener('click', async () => {
    document.getElementById('latency').textContent = 'Testing...';
    document.getElementById('downloadSpeed').textContent = 'Testing...';
    document.getElementById('uploadSpeed').textContent = 'Testing...';
  
    try {
      // Measure latency
      const latencyStart = performance.now();
      const latencyResponse = await fetch('/api/latency');
      const latencyData = await latencyResponse.json();
      const latencyEnd = performance.now();
      document.getElementById('latency').textContent = latencyData.latency || 'Error';
  
      // Measure download speed
      const downloadStart = performance.now();
      const downloadResponse = await fetch('/api/download');
      await downloadResponse.arrayBuffer(); // Consume the data
      const downloadEnd = performance.now();
      const downloadTime = (downloadEnd - downloadStart) / 1000; // Time in seconds
      const downloadSpeed = (5 * 8) / downloadTime; // Speed in Mbps (5 MB * 8 bits per byte)
      document.getElementById('downloadSpeed').textContent = isNaN(downloadSpeed) ? 'Error' : downloadSpeed.toFixed(2);
  
      // Measure upload speed
      const uploadStart = performance.now();
      const dataToUpload = new Blob([new ArrayBuffer(2 * 1024 * 1024)]); // 2 MB of data
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: dataToUpload,
      });
      const uploadEnd = performance.now();
      const uploadData = await uploadResponse.json();
  
      if (uploadData.uploadSpeed) {
        document.getElementById('uploadSpeed').textContent = uploadData.uploadSpeed.toFixed(2);
      } else {
        document.getElementById('uploadSpeed').textContent = 'Error';
      }
    } catch (error) {
      console.error('An error occurred:', error);
      document.getElementById('latency').textContent = 'Error';
      document.getElementById('downloadSpeed').textContent = 'Error';
      document.getElementById('uploadSpeed').textContent = 'Error';
    }
  });
  