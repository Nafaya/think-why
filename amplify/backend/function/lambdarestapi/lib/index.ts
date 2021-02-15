import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { createServer, proxy, Response } from 'aws-serverless-express';
import app from './app';

const server = createServer(app);

export function handler(event: APIGatewayProxyEvent, context: Context) : Promise<Response> {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return proxy(server, event, context, 'PROMISE').promise;
}
