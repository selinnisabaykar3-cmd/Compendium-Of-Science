import { put } from "@vercel/blob";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {

  try {

    return res.status(200).json({
      hasToken: !!process.env.BLOB_READ_WRITE_TOKEN
    });

  } catch (error) {

    return res.status(500).json({
      error: error.message
    });

  }

}