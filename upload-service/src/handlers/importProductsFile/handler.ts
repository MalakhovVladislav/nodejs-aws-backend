import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { S3 } from 'aws-sdk'
import { APIGatewayProxyEvent } from 'aws-lambda';


export const importProductsFile = async (event: APIGatewayProxyEvent) => {
  const { name } = event.queryStringParameters
  console.log(`creating a file with a name: ${name}`)

  const s3 = new S3({ region: process.env.REGION })
  try {
    const sUrl = await s3.getSignedUrlPromise('putObject', {
      Bucket: process.env.S3_BUCKET,
      Key: `uploaded/${name}`,
      Expires: 60,
      ContentType: 'text/csv'
    })
    return formatJSONResponse(sUrl, 200);
  } catch (e) {
    console.error(e)
    return formatJSONResponse({ message: 'internal server error' }, 500);
  }
}