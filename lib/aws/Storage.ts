import S3 from "aws-sdk/clients/s3";

const storage = new S3({
  region: "eu-west-2",
  accessKeyId: process.env.APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY,
});

export default storage;
