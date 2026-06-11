export default async function handler(req, res) {
  try {
    res.setHeader("Content-Type", "application/json");

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const { name, job } = req.body || {};

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Write a professional cover letter for ${name} applying for ${job}`
          }
        ]
      })
    });

    const data = await response.json();

    const result = data?.choices?.[0]?.message?.content;

    if (!result) {
      return res.status(500).json({
        error: "OpenAI did not return a valid response",
        raw: data
      });
    }

    return res.status(200).json({ result });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: error.message || "Server crashed"
    });
  }
}
