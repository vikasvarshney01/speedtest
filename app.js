document.getElementById('runTest').addEventListener('click', async () => {
    document.getElementById('latency').textContent = 'Testing...';
    document.getElementById('downloadSpeed').textContent = 'Testing...';
    document.getElementById('uploadSpeed').textContent = 'Testing...';
  
    // Measure latency
    const latencyStart = performance.now();
    const latencyResponse = await fetch('/api/latency');
    const latencyData = await latencyResponse.json();
    const latencyEnd = performance.now();
    document.getElementById('latency').textContent = latencyData.latency;
  
    // Measure download speed
    const downloadStart = performance.now();
    const downloadResponse = await fetch('/api/download');
    await downloadResponse.arrayBuffer(); // Consume the data
    const downloadEnd = performance.now();
    const downloadTime = (downloadEnd - downloadStart) / 1000; // Time in seconds
    const downloadSpeed = (5 * 8) / downloadTime; // Speed in Mbps (5 MB * 8 bits per byte)
    document.getElementById('downloadSpeed').textContent = downloadSpeed.toFixed(2);
  
    // Measure upload speed
    const uploadStart = performance.now();
    const dataToUpload = new Blob([new ArrayBuffer(5 * 1024 * 1024)]); // 5 MB of data
    const uploadResponse = await fetch('/api/upload', {
      method: 'POST',
      body: dataToUpload,
    });
    const uploadEnd = performance.now();
    const uploadData = await uploadResponse.json();
    document.getElementById('uploadSpeed').textContent = uploadData.uploadSpeed.toFixed(2);
  });
  