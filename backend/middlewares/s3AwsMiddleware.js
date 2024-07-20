const s3Client = require('../s3')
require("dotenv").config();
const upload = require("./middlewares/multerMiddleware.js")
const { PutObjectCommand } = require('@aws-sdk/client-s3');



const uploadToS3 = async (req, res, next) => {
  const { mentorId, userId, name, date } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "File is required" });
  }
  const parsedDate = new Date(date);
  const sanitizedFileName = name.replace(/\s+/g, "-");
  const sanitizedDate = parsedDate.toISOString().split("T")[0]; // Format YYYY-MM-DD
  const key = `${mentorId}/${userId}/${sanitizedFileName}_${sanitizedDate}.png`;
//   console.log(key)
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  };
  try {
    const command = new PutObjectCommand(params)
    const data = await s3Client.send(command);
    // console.log(data)
    req.fileUrl = data.Location;
    res.status(200).json({message: 'file success', fileURL});
    next();
  } catch (err) {
    // console.error('S3 Upload Error:', err); 
    res.status(500).json({ error: "Error uploading file to S3 bucket" });
  }
};

module.exports = uploadToS3;
