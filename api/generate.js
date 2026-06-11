export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const { name, job } = req.body || {};

    const prompt = `Write a professional cover letter for ${name} applying for ${job}.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    // 🔥 IMPORTANT: return FULL response for debugging
    return res.status(200).json({
      raw: data
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
