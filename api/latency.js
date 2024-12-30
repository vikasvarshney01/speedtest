export default function handler(req, res) {
    const startTime = Date.now();
    res.status(200).json({ latency: Date.now() - startTime });
  }
  