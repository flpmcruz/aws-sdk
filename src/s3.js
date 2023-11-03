import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
  region: process.env.AWSREGION || "AWSREGION",
  credentials: {
    accessKeyId: process.env.AWSACCESSKEY || "AWSACCESSKEY",
    secretAccessKey: process.env.AWSSECRETACCESSKEY || "AWSSECRETACCESSKEY",
  },
});

export const getFileFromBucket = async (Key) => {
  try {
    const url = await getSignedUrl(
      client,
      new GetObjectCommand({
        Bucket: "bucketName",
        Key,
      })
    );
    return url;
  } catch (error) {
    console.log(error);
  }
};

export const uploadFileToBucket = async (Key, Body) => {
  const uploadParams = {
    Bucket: "bucketName",
    Key,
    Body,
  };
  try {
    const command = new PutObjectCommand(uploadParams);
    return await client.send(command);
  } catch (error) {
    console.log(error);
  }
};

export const deleteFileFromBucket = async (Key) => {
  const deleteParams = {
    Bucket: "bucketName",
    Key,
  };
  const deleteCommand = new DeleteObjectCommand(deleteParams);
  return await client.send(deleteCommand);
};
