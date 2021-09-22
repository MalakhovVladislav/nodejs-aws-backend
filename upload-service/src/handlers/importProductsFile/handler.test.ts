import { importProductsFile } from "./handler"

import * as AWSMock from 'aws-sdk-mock';
import { APIGatewayProxyEvent } from "aws-lambda";


describe("test importProductsFile", () => {

  afterEach(() => {
    AWSMock.restore()
  })

  it("returns signedURL", async () => {
    AWSMock.mock('S3', 'getSignedUrl', Promise.resolve("expectedURL"))
    process.env = { S3_BUCKET: '123' }

    const e: APIGatewayProxyEvent = {
      queryStringParameters: {
        name: "1"
      }
    } as any
    const result = await importProductsFile(e)

    expect(result).toEqual({ body: JSON.stringify("expectedURL"), headers: { "Access-Control-Allow-Origin": "*" }, statusCode: 200 })
  })

  it("returns internal server error", async () => {
    AWSMock.mock('S3', 'getSignedUrl', Promise.reject('err'))
    process.env = { S3_BUCKET: '123' }

    const e: APIGatewayProxyEvent = {
      queryStringParameters: {
        name: "1"
      }
    } as any
    const result = await importProductsFile(e)

    expect(result).toEqual({ body: JSON.stringify({ message: "internal server error" }), headers: { "Access-Control-Allow-Origin": "*" }, statusCode: 500 })
  })
})

