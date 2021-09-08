import 'source-map-support/register';
import { formatJSONResponse } from '@libs/apiGateway';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';

import { createProduct as serviceCreateProduct } from 'src/services/products';
import { Product, badRequestMsg, internalServerError } from 'src/models';

export const createProduct: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const { body } = event
    const product: Product = JSON.parse(body)
    
    console.log("Incoming request to create a product...")
    console.info("Params: ", product)

    if (!product.title || !product.description || !product.price) {
      console.warn("failed to create a product: invalid request")
      return formatJSONResponse({code: 400, message: badRequestMsg }, 400);
    }

    const id = await serviceCreateProduct(product)

    return formatJSONResponse({id: id}, 200);
  } catch (e) {
    console.error(`failed to create a product: ${e.message}`)
    return formatJSONResponse({ data: { code: 500, message: internalServerError } }, 500)
  }
}


