export default async function handler(req, res) {

return res.status(200).json({
hasBlobToken: !!process.env.BLOB_READ_WRITE_TOKEN
});

}

