import { put } from "@vercel/blob";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const { filename, content } = req.body;

    const blob = await put(
      filename,
      content,
      {
        access: "public"
      }
    );

    return res.status(200).json({
      success: true,
      url: blob.url
    });

  } catch (error) {

    return res.status(500).json({
      error: error.message
    });

  }

}
