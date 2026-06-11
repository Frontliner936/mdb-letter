import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const { name, job, company, education, experience, skills } = req.body;

    const prompt = `
Write a professional cover letter.

Name: ${name}
Job Title: ${job}
Company: ${company}
Education: ${education}
Experience: ${experience}
Skills: ${skills}

Create a professional ATS-friendly cover letter.
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

    res.status(200).json({
      result: response.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}
