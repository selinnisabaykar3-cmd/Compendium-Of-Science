export default async function handler(req, res) {

try {

```
if (req.method !== "POST") {
  return res.status(405).json({
    error: "Method not allowed"
  });
}

if (!process.env.GROQ_API_KEY) {
  return res.status(500).json({
    error: "GROQ_API_KEY not found"
  });
}

const question = req.body?.question || "";

const groqResponse = await fetch(
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
            "You are Compendium AI. Answer scientific questions clearly. If the question is Turkish, answer in Turkish."
        },
        {
          role: "user",
          content: question
        }
      ]
    })
  }
);

const data = await groqResponse.json();

return res.status(200).json({
  answer:
    data.choices?.[0]?.message?.content ||
    "No response generated."
});
```

} catch (error) {

```
return res.status(500).json({
  error: error.message
});
```

}

}
