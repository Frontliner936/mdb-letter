export default async function handler(req, res) {
  try {
    res.setHeader("Content-Type", "application/json");

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const { name, job } = req.body || {};

    if (!name || !job) {
      return res.status(400).json({ error: "Missing name or job" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Write a professional cover letter for ${name} applying for ${job}. Make it formal, ATS friendly, and 300 words.`
          }
        ]
      })
    });

    const data = await response.json();

    // OpenAI error handling
    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({
        error: "OpenAI response invalid",
        raw: data
      });
    }

    const result = data.choices[0].message.content;

    return res.status(200).json({
      result
    });

  } catch (error) {
    console.log("SERVER ERROR:", error);

    return res.status(500).json({
      error: error.message || "Server error"
    });
  }
}
