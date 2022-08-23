import 'dotenv/config';
import AWS from 'aws-sdk';

const SQS_ACCESS_KEY: string = process.env.SQS_ACCESS_KEY || '';
const SQS_SECRET_KEY: string = process.env.SQS_SECRET_KEY || '';
const SQS_REGION: string = process.env.SQS_REGION || '';
const SQS_QUEUE_URL: string = process.env.SQS_QUEUE_URL || '';

console.log('SQS REGION    ', SQS_REGION);
console.log('SQS QUEUE URL ', SQS_QUEUE_URL);

AWS.config.update({
  region: SQS_REGION,
  accessKeyId: SQS_ACCESS_KEY,
  secretAccessKey: SQS_SECRET_KEY,
});

const sqs: AWS.SQS = new AWS.SQS();

const attributeNames: AWS.SQS.AttributeNameList = [
  'ApproximateNumberOfMessages',
  'ApproximateNumberOfMessagesNotVisible',
  'ApproximateNumberOfMessagesDelayed',
];

const params: AWS.SQS.GetQueueAttributesRequest = {
  QueueUrl: SQS_QUEUE_URL,
  AttributeNames: attributeNames,
};

sqs.getQueueAttributes(
  params,
  (err: AWS.AWSError, data: AWS.SQS.GetQueueAttributesResult) => {
    if (err) {
      console.log('Error', err.message);
    } else {
      console.table(data.Attributes);
    }
  },
);
