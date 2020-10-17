const imageUpload = async (base64) => {

  const AWS = require('aws-sdk');
  const uuid = require('uuid').v4

  const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET } = {
    ACCESS_KEY_ID:"AKIAY7SN6HWXSJZBWBWS",
    SECRET_ACCESS_KEY:"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",
    AWS_REGION:"us-east-2",
    S3_BUCKET:"test323hxshs",
  };

  AWS.config.setPromisesDependency(require('bluebird'));
  AWS.config.update({ accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY, region: AWS_REGION });

  const s3 = new AWS.S3();

  const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');

  const type = base64.split(';')[0].split('/')[1];

  const userId = uuid();

  const params = {
    Bucket: S3_BUCKET,
    Key: `${userId}.${type}`, // type is not required
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64', // required
    ContentType: `image/${type}` // required. Notice the back ticks
  }

  let location = '';
  let key = '';
  try {
    const { Location, Key } = await s3.upload(params).promise();
    location = Location;
    key = Key;
  } catch (error) {
     console.log(error)
  }

  // console.log(location, key);

  return location;
}

module.exports ={
  imageUpload
} 