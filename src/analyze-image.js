const AWS = require('aws-sdk');

const index = (event, ctx, callback) => {
  console.log('Entering index()');
  const rekognition = new AWS.Rekognition();
  const params = {
    Image: {
      S3Object: {
        Bucket: s3Config.bucket,
        Name: s3Config.imageName,
      },
    },
    MaxLabels: 10,
    MinConfidence: 50,
  };
};

module.exports = {
  index,
};
