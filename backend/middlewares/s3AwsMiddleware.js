const s3 = require("../s3");
require("dotenv").config;

const uploadTos3 = async(req,res, next)=>{
    const {mentorId, userId, name, date} = req.body;
    const file = req.file;

    if(!file){
        return res.status(400).json({error: "File is required"});
    }

    const key = `${mentorId}/${userId}/${name}_${date}`;
    const params = {
        Bucket : process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: 'image/png',
        ACL: 'public-read'
    };

    try{
        const data = await s3.upload(params).promise();
        req.fileUrl = data.Location;
        next();
    } catch(err){
        res.status(500).json({error: 'Error uploading file to S3 bucket'});
    }
};

module.exports = uploadToS3;