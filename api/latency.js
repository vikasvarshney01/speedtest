export default function handler(req, res) {
    const start = Date.now();
    setTimeout(() => {
      const latency = Date.now() - start;
      res.status(200).json({ latency });
    }, 100); // Simulates some network delay
  }
  