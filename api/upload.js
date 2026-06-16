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

    return res.status(200).json({
      message:
      "Upload endpoint hazır"
    });

  }

  catch(error) {

    return res.status(500).json({
      error: error.message
    });

  }

}