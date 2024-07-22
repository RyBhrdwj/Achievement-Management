const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const s3Client = new S3Client({
    region: "eu-north-1",
    credentials: {
        accessKeyId: "AKIAU6GD326RVPDICZX2",
    secretAccessKey: "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"},
});

const uploadToS3 = async (fileContent, bucketName,key)=>{
    const params = {
        Bucket : "bucket-private-site",
        Key: key,
        Body: fileContent,
        ACL: 'public-read',
        ContentType: fileContent.mimetype,
    };
    try{
        const command = new PutObjectCommand(params);
        const data = await s3Client.send(command);
        console.log(data)
        const fileUrl = `https://bucket-private-site.s3.eu-north-1.amazonaws.com/${key}`
        return fileUrl
    } catch(err){
        console.error("error uploading", err);
        throw new Error("error upload krne men")
    }
};
module.exports = { uploadToS3 };
