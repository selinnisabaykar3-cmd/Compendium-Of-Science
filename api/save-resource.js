import fs from "fs";
import path from "path";

export default function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const filePath = path.join(
    process.cwd(),
    "data",
    "resources.json"
  );

  const resources = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );

  resources.push(req.body);

  fs.writeFileSync(
    filePath,
    JSON.stringify(resources, null, 2)
  );

  res.status(200).json({
    success: true
  });

}