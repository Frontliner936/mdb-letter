import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { name, job } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Write a cover letter for ${name} applying for ${job}`
        }
      ]
    });

    res.status(200).json({
      result: response.choices[0].message.content
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
