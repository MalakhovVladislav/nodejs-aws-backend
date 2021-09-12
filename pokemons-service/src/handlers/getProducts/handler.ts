import 'source-map-support/register';
import { formatJSONResponse } from '@libs/apiGateway';
import { APIGatewayProxyHandler } from 'aws-lambda';

import { getProducts as getAll } from 'src/services/products';
import { internalServerError } from 'src/models';

export const getProducts: APIGatewayProxyHandler = async () => {
  console.log("Incoming request to get all products...")
  try {
    const products = await getAll() || []
    return formatJSONResponse(products, 200);
  } catch (e) {
    console.error(`failed to get all products: ${e.message}`)
    return formatJSONResponse({ data: { code: 500, message: internalServerError } }, 500)
  }
}
