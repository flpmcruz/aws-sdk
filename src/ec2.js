import {
  EC2Client,
  DescribeInstanceStatusCommand,
  RunInstancesCommand,
} from "@aws-sdk/client-ec2";
import { config } from "dotenv";
config();

const client = new EC2Client({
  region: process.env.AWSREGION || "AWSREGION",
  credentials: {
    accessKeyId: process.env.AWSACCESSKEY || "AWSACCESSKEY",
    secretAccessKey: process.env.AWSSECRETACCESSKEY || "AWSSECRETACCESSKEY",
  },
});

// List instances
export const listInstances = async (input = {}) => {
  try {
    const command = new DescribeInstanceStatusCommand(input);
    return await client.send(command);
  } catch (error) {
    throw error;
  }
};
const describeInput = {
  IncludeAllInstances: true,
};
// listInstances(describeInput).then(console.log).catch(console.log)

// Run instance
export const runInstance = async (input) => {
  try {
    const command = new RunInstancesCommand(input);
    return await client.send(command);
  } catch (error) {
    throw error;
  }
};

const runInput = {
  BlockDeviceMappings: [
    {
      DeviceName: "/dev/xvda",
      Ebs: {
        VolumeSize: 8,
      },
    },
  ],
  ImageId: "ami-08cba41c585e4a2e2",
  InstanceType: "t2.micro",
  KeyName: "string",
  MaxCount: 1,
  MinCount: 1,
  SecurityGroupIds: ["sg-0565959592"],
  SubnetId: "subnet-9526294",
  TagSpecifications: [
    {
      ResourceType: "instance",
      Tags: [
        {
          Key: "Purpose",
          Value: "test",
        },
      ],
    },
  ],
};
// runInstance(runInput).then(console.log).catch(console.log);
