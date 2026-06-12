export default async function handler(req, res) {

  return res.status(200).json({
    hasKey: !!process.env.GROQ_API_KEY,
    keyLength: process.env.GROQ_API_KEY?.length || 0
  });

}