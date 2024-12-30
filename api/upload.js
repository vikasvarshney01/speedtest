export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Get the content length from headers
    const contentLength = parseInt(req.headers['content-length'] || '0');
    const startTime = Date.now();

    try {
        // Wait for the entire request body
        const chunks = [];
        for await (const chunk of req) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);
        const totalSize = buffer.length;
        
        const endTime = Date.now();
        const durationSeconds = (endTime - startTime) / 1000;

        if (totalSize === 0 || durationSeconds === 0) {
            return res.status(400).json({ error: 'No data received' });
        }

        const uploadSpeed = (totalSize * 8) / (1024 * 1024 * durationSeconds); // Mbps
        return res.status(200).json({ uploadSpeed });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}