import type { AWS } from '@serverless/typescript';

import getProducts from 'src/handlers/getProducts';
import getProductByID from 'src/handlers/getProductByID';
import createProduct from 'src/handlers/createProduct';
import catalogBatchProcess from 'src/handlers/catalogBatchProcess';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PG_HOST: process.env.PG_HOST,
      PG_PORT: process.env.PG_PORT,
      PG_DATABASE: process.env.PG_DATABASE,
      PG_USERNAME: process.env.PG_USERNAME,
      PG_PASSWORD: process.env.PG_PASSWORD,
      SQS_ARN: { 'Fn::ImportValue': 'catalogItemsQueueArn' },
      SNS_ARN: { Ref: 'productCreatedTopic' },
    },
    lambdaHashingVersion: '20201221',
  },
  resources: {
    Resources: {
      productCreatedTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'productCreatedTopic',
        }
      },
      productCreatedSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'some.test.email@gmail.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'productCreatedTopic'
          },
        },
      }
    },
    Outputs: {
      catalogItemsQueueArn: {
        Value: {
          'Fn::GetAtt': [
            'catalogItemsQueue',
            'Arn'
          ],
        },
        Export: {
          Name: 'catalogItemsQueueArn'
        }
      },
    }
  },
  // import the function via paths
  functions: { getProducts, getProductByID, createProduct, catalogBatchProcess },
};

module.exports = serverlessConfiguration;