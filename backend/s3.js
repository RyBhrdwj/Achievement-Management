const AWS = require('aws-sdk');
require('dotenv').config();

const s3 = new AWS.S3({
    accessId : 'AKIAU6GD326RVPDICZX2',
    secretAccessKey: '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',
    region: 'eu-north-1',
    bucket: 'bucket-private-site'
});


module.exports = s3;