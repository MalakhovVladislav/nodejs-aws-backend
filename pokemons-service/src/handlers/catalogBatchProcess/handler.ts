import { formatJSONResponse } from '@libs/apiGateway';
import { SNS } from 'aws-sdk'
import { createProduct as serviceCreateProduct } from 'src/services/products';
import { Product, badRequestMsg, internalServerError } from 'src/models';

export const catalogBatchProcess = async (event) => {
  console.log(event.Records)
  try {
    for (const record of event.Records) {
      console.log("Incoming request from SQS to create a product...")
      const product = JSON.parse(record.body)

      if (!product.title || !product.description || !product.price) {
        console.warn("failed to validate a product: bad request")
        return formatJSONResponse({ code: 400, message: badRequestMsg }, 500)
      }

      console.info(`product to create: ${product} `)
      await serviceCreateProduct(product)

      await new Promise((res, rej) => {
        const sns = new SNS({ region: 'eu-west-1' });
        sns.publish({
          Subject: 'New product',
          Message: `New product have been uploaded by .csv file: ${product}`,
          TopicArn: process.env.SNS_ARN,
        }, (error) => {
          if (error) {
            rej(error)
          }

          console.log('A message has been sent by email');
          res(1);
        });
      })
    }
  } catch (e) {
    console.error(e)
  }
}


