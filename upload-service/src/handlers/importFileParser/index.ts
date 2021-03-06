import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.importFileParser`,
  events: [
    {
      s3: {
        bucket: 'rs-csv-bucket',
        event: 's3:ObjectCreated:*',
        rules: [
          {
            prefix: 'uploaded/',
            suffix: '.csv',
          },
        ],
        existing: true
      }
    },
  ],
}
