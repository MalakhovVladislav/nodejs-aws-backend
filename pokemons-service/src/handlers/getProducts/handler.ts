import 'source-map-support/register';
import { formatJSONResponse } from '@libs/apiGateway';
import { APIGatewayProxyHandler } from 'aws-lambda';

import { getProducts as getAll } from '@services/products';

export const getProducts: APIGatewayProxyHandler = async () => {
  try {
    const products = await getAll() || []
    return formatJSONResponse(products, 200);
  } catch (e) {
    return formatJSONResponse({ data: { code: 500, message: "Internal server error" } }, 500)
  }
}
