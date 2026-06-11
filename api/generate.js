import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    // FORCE JSON response always
    res.setHeader("Content-Type", "application/json");

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const { name, job } = req.body || {};

    if (!name || !job) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Write a professional cover letter for ${name} applying for ${job}`
        }
      ]
    });

    const result = response.choices?.[0]?.message?.content || "";

    return res.status(200).json({
      result
    });

  } catch (error) {
    console.log("API ERROR:", error);

    // IMPORTANT: always return JSON even on error
    return res.status(500).json({
      error: error.message || "Unknown server error"
    });
  }
}
