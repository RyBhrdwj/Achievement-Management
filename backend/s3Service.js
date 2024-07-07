const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: 'eu-north-1', 
  credentials: {
    accessKeyId: 'AKIAU6GD326RYKLOIZP7', 
    secretAccessKey: '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' 
  }
});

const bucketName = 'bucket-private12'; 
const generateUploadURL = async (mentorName, studentName, fileName) => {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: `${mentorName}/${studentName}/${fileName}`,
    ContentType: 'image/png', // Adjust this according to your file type
  });

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return url;
  } catch (error) {
    console.error(`Error generating upload URL: ${error.message}`);
    throw error;
  }
};

const generateDownloadURL = async (mentorName, studentName, fileName) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: `${mentorName}/${studentName}/${fileName}`
  });

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return url;
  } catch (error) {
    console.error(`Error generating download URL: ${error.message}`);
    throw error;
  }
};

module.exports = { generateUploadURL, generateDownloadURL };
