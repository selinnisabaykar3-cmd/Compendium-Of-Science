export default async function handler(req, res) {

  return res.status(200).json({
    keys: Object.keys(process.env)
      .filter(key => key.includes("BLOB"))
  });

}