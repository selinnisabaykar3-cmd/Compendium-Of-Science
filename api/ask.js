export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({
error: "Method not allowed"
});
}

try {

```
const { question } = req.body;

const response = await fetch(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "Authorization":
        `Bearer ${process.env.GROQ_API_KEY}`
    },

    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content:
            "You are Compendium AI, a scientific assistant. Answer clearly and educationally. Prefer Turkish when the user writes in Turkish."
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
  answer:
  data.choices?.[0]?.message?.content
  || "No response generated."
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
