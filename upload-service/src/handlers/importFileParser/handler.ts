import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { S3 } from 'aws-sdk'
import * as csv from 'csv-parser'

export const importFileParser = async (event) => {
  const s3 = new S3({ region: process.env.REGION })
  const results = [];

  try {
    for (const record of event.Records) {
      s3.getObject(
        {
          Bucket: process.env.S3_BUCKET,
          Key: record.s3.object.key,
        }).createReadStream()
        .pipe(csv())
        .on('data', (data) => {
          results.push(data)
        })
        .on('end', async () => {
          console.log(results)

          await s3.copyObject({
            Bucket: process.env.S3_BUCKET,
            CopySource: `${process.env.S3_BUCKET}/${record.s3.object.key}`,
            Key: record.s3.object.key.replace('uploaded', 'parsed'),
          }).promise()

          await s3.deleteObject({
            Bucket: process.env.S3_BUCKET,
            Key: record.s3.object.key,
          }).promise()

        });
    }
    return formatJSONResponse({}, 200);
  } catch (e) {
    console.error(e)
    return formatJSONResponse({ message: 'internal server error' }, 500);
  }
}