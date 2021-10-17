import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { S3, SQS } from 'aws-sdk'
import * as csv from 'csv-parser'

export const importFileParser = async (event) => {
  const s3 = new S3({ region: process.env.REGION })
  const sqs = new SQS();
  const results = [];

  try {
    for (const record of event.Records) {
      await new Promise((res) => {
        s3.getObject(
          {
            Bucket: process.env.S3_BUCKET,
            Key: record.s3.object.key,
          }).createReadStream()
          .pipe(csv())
          .on('data', (data) => {
            results.push(data)
            console.log('data', data)
          })
          .on('end', async () => {
            await s3.copyObject({
              Bucket: process.env.S3_BUCKET,
              CopySource: `${process.env.S3_BUCKET}/${record.s3.object.key}`,
              Key: record.s3.object.key.replace('uploaded', 'parsed'),
            }).promise()

            await s3.deleteObject({
              Bucket: process.env.S3_BUCKET,
              Key: record.s3.object.key,
            }).promise()
            res(1)
          });
      })

    }

    for (const result of results) {
      await sqs.sendMessage({
        QueueUrl: process.env.SQS_URL,
        MessageBody: JSON.stringify(result),
      }).promise()
    }


    return formatJSONResponse({}, 200);
  } catch (e) {
    console.error(e)
    return formatJSONResponse({ message: 'internal server error' }, 500);
  }
}