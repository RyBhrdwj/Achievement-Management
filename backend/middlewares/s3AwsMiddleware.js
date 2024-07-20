const s3 = require('../s3')
require("dotenv").config();



const uploadTos3 = async (req, res, next) => {
  const { mentorId, userId, name, date } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "File is required" });
  }
  const parsedDate = new Date(date);
  const sanitizedFileName = name.replace(/\s+/g, "-");
  const sanitizedDate = parsedDate.toISOString().split("T")[0]; // Format YYYY-MM-DD
  const key = `${mentorId}/${userId}/${sanitizedFileName}_${sanitizedDate}`;
  console.log(key)
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: "image/png",
    ACL: "public-read",
  };
  try {
    const data = await s3.upload(params).promise();
    console.log(data)
    req.fileUrl = data.Location;
    next();
  } catch (err) {
    console.error('S3 Upload Error:', err); 
    res.status(500).json({ error: "Error uploading file to S3 bucket" });
  }
};

module.exports = uploadTos3;
