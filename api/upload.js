export default async function handler(req, res) {

  return res.status(200).json({
    storeId: process.env.BLOB_STORE_ID,
    hasToken: !!process.env.BLOB_READ_WRITE_TOKEN
  });

}