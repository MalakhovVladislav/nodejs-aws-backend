import 'source-map-support/register';
import { formatJSONResponse } from '@libs/apiGateway';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';

import { getProductByID as getByID } from 'src/services/products';
import { internalServerError, notFoundMsg } from 'src/models';

export const getProductByID: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const { productID } = event.pathParameters
  
  console.log("Incoming request to get a product by ID...")
  console.info(`ID: ${productID}`)
  
  try {
    const product = await getByID(productID)

    if (product) {
      return formatJSONResponse(product, 200)
    }

    return formatJSONResponse({ data: { code: 404, message: notFoundMsg } }, 404)
  } catch (e) {
    console.error(`failed to get a product with ID - ${productID}: ${e.message}`)
    return formatJSONResponse({ data: { code: 500, message: internalServerError } }, 500)
  }
}
