import type { AWS } from '@serverless/typescript';

import importFileParser from 'src/handlers/importFileParser';
import importProductsFile from 'src/handlers/importProductsFile';

const serverlessConfiguration: AWS = {
  service: 'upload-service',
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
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 's3:*',
        Resource: ['arn:aws:s3:::rs-csv-bucket/*', 'arn:aws:s3:::rs-csv-bucket'],
      },
      {
        Effect: 'Allow',
        Resource: 'arn:aws:sqs:eu-west-1:946106612827:catalogItemsQueue', // TODO: set variable for arn
        Action: 'sqs:*',
      },
    ],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      S3_BUCKET: process.env.S3_BUCKET,
      REGION: process.env.REGION,
      SQS_URL: { Ref: 'catalogItemsQueue' },
    },
    lambdaHashingVersion: '20201221',
  },
  resources: {
    Resources: {
      catalogItemsQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'catalogItemsQueue'
        }
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
  functions: { importProductsFile, importFileParser },
};

module.exports = serverlessConfiguration;
