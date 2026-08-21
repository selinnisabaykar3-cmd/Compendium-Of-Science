import { Readable } from "node:stream";
import { get } from "@vercel/blob";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({
        error: "Method not allowed",
      });
    }

    const { pathname } = req.query;

    if (!pathname) {
      return res.status(400).json({
        error: "Missing pathname",
      });
    }

    const result = await get(pathname, {
      access: "private",
    });

    if (!result || result.statusCode !== 200) {
      return res.status(404).send("Not found");
    }

    res.setHeader(
      "Content-Type",
      result.blob.contentType || "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "inline"
    );

    res.setHeader(
      "X-Content-Type-Options",
      "nosniff"
    );

    res.setHeader(
      "Cache-Control",
      "private, no-cache"
    );

    Readable.fromWeb(result.stream).pipe(res);
  } catch (error) {
    console.error("VIEW PDF ERROR:", error);

    return res.status(500).json({
      error: error?.message || "Unknown error",
    });
  }
}