import { get } from "@vercel/blob";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({
        error: "Method not allowed",
      });
    }

    const pathname = req.query.pathname;

    if (!pathname) {
      return res.status(400).json({
        error: "Missing pathname",
      });
    }

    console.log("VIEW PDF pathname:", pathname);

    const result = await get(pathname, {
      access: "private",
    });

    console.log("VIEW PDF RESULT:", result);

    if (!result) {
      return res.status(404).json({
        error: "Blob not found",
      });
    }

    res.setHeader(
      "Content-Type",
      result.blob?.contentType || "application/pdf"
    );

    res.setHeader("Content-Disposition", "inline");

    return result.stream.pipe(res);
  } catch (error) {
    console.error("VIEW PDF ERROR:", error);

    return res.status(500).json({
      error: error?.message || "Unknown error",
      name: error?.name || "UnknownError",
    });
  }
}