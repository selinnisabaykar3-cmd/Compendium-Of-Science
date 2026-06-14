export default async function handler(req, res) {

try {


if (req.method !== "POST") {
  return res.status(405).json({
    error: "Method not allowed"
  });
}

const { question } = req.body;

const response = await fetch(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are Compendium AI, a scientific assistant. Explain concepts clearly. If the user writes in Turkish, answer in Turkish."
        },
        {
          role: "user",
          content: question
        }
      ]
    })
  }
);

const data = await response.json();

return res.status(200).json({
  answer: data.choices[0].message.content
});


} catch (error) {


return res.status(500).json({
  error: error.message
});


}

}
