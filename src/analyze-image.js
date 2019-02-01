const AWS = require('aws-sdk');

const accountSid = 'ACb852b93c946098624e7da6c59b8e80fc';
const authToken = 'my-auth-token';
const client = require('twilio')(accountSid, authToken);

const index = async (event) => {
  console.log('Entering index()');
  const rekognition = new AWS.Rekognition();
  const Bucket = event.Records[0].s3.bucket.name;
  const Name = event.Records[0].s3.object.key;

  const params = {
    Image: {
      S3Object: {
        Bucket,
        Name,
      },
    },
    MaxLabels: 10,
    MinConfidence: 50,
  };

  console.log(`Trying to rekognize ${Bucket}/${Name}`);
  const labels = await rekognition.detectLabels(params).promise();

  console.log('Found these labels', labels);

  const result = await client.messages.create({
    body: `You uploaded a picture of a ${labels.Labels[0].Name}`,
    from: '+16149074439',
    to: '+my-phone-number',
  });

  console.log('Finished sending a text!', result);
};

module.exports = {
  index,
};
