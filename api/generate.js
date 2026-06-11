export default async function handler(req, res) {
  try {
    const { name, job } = req.body || {};

    const coverLetter = `
Dear Hiring Manager,

I am writing to express my interest in the ${job} position.

My name is ${name}, and I am eager to contribute my skills and experience to your organization.

I am a hardworking and dedicated professional who is ready to learn and grow within your company.

Thank you for considering my application.

Sincerely,
${name}
`;

    return res.status(200).json({
      result: coverLetter
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
