import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const { name, job } = req.body || {};

    if (!name || !job) {
      return res.status(400).json({ error: "Missing name or job" });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Write a professional cover letter for ${name} applying for ${job}. Make it ATS friendly, formal and 300 words.`
        }
      ]
    });

    const result = completion.choices?.[0]?.message?.content;

    if (!result) {
      return res.status(500).json({
        error: "No response from OpenAI",
        raw: completion
      });
    }

    return res.status(200).json({ result });

  } catch (error) {
    console.log("OPENAI ERROR:", error);

    return res.status(500).json({
      error: error.message
    });
  }
}
