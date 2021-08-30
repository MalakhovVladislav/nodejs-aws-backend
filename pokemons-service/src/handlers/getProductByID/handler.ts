import 'source-map-support/register';
import { formatJSONResponse } from '@libs/apiGateway';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';

import { getProductByID as getByID } from '@services/products';

export const getProductByID: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const { productID } = event.pathParameters
  try {
    const product = await getByID(productID)
    if (product) {
      return formatJSONResponse(product, 200)
    }
    return formatJSONResponse({ data: { code: 404, message: "Product not found" } }, 404)
  } catch (e) {
    return formatJSONResponse({ data: { code: 500, message: "internal server error" } }, 500)
  }
}
