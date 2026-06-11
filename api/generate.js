export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const { name, job } = req.body || {};

    if (!name || !job) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const prompt = `Write a professional ATS-friendly cover letter for ${name} applying for ${job}.`;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 300,
            temperature: 0.7
          }
        })
      }
    );

    const data = await response.json();

    console.log("HF RESPONSE:", data);

    let result = "";

    if (Array.isArray(data)) {
      result = data[0]?.generated_text;
    } else {
      result = data?.generated_text || data?.error || JSON.stringify(data);
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
