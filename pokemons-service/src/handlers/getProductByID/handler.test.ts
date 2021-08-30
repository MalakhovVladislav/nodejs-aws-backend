import { APIGatewayProxyEvent } from "aws-lambda"
import { getProductByID } from "./handler"

describe("Test getProductByID", () => {
    it("returns product with given ID", async ()=> {
        const e: APIGatewayProxyEvent = {
            pathParameters: {
                productID: "1"
            }
        } as any

        const result = await getProductByID(e, null, null)

        expect(result).toEqual( {
            statusCode: 200,
            body: '{"id":"1","title":"Pickachu","description":"Electric-type Pokémon","price":10}',
            headers: {
              'Access-Control-Allow-Credentials': true,
              'Access-Control-Allow-Methods': '*',
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'
            }
          })
    })

    it("returns not found with code", async () => {
        const e: APIGatewayProxyEvent = {
            pathParameters: {
                productID: "not-found"
            }
        } as any

        const result = await getProductByID(e, null, null)

        expect(result).toEqual({
            statusCode: 404,
            body: '{"data":{"code":404,"message":"Product not found"}}',
            headers: {
              'Access-Control-Allow-Credentials': true,
              'Access-Control-Allow-Methods': '*',
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'
            }
          })
    })
})

