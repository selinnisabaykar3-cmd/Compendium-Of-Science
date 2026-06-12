export default async function handler(req, res) {

try {

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
          role: "user",
          content: "Merhaba"
        }
      ]
    })
  }
);

const text = await response.text();

return res.status(200).send(text);


} catch (error) {

return res.status(500).json({
  error: error.message,
  stack: error.stack
});
}

}