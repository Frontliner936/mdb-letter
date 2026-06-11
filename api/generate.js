export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const { name, job } = req.body || {};

    if (!name || !job) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const prompt = `
Write a professional cover letter for ${name} applying for ${job}.
Make it ATS friendly, formal, and around 300 words.
`;

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

    const result =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!result) {
      return res.status(500).json({
        error: "Gemini returned empty response",
        debug: data
      });
    }

    return res.status(200).json({
      result
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
