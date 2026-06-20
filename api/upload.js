import { put } from "@vercel/blob";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {

  try {

    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Method not allowed"
      });
    }

    const filename =
      decodeURIComponent(
        req.headers["x-filename"]
      );

    const blob = await put(
  filename,
  req,
  {
    access: "private"
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