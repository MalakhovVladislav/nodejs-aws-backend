import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.getProductByID`,
  events: [
    {
      http: {
        method: 'get',
        path: '/products/{productID}',
        cors: true,
      }
    }
  ]
}
