import * as AWS from 'aws-sdk';
AWS.config.update({ region: process.env.TABLE_REGION });

import express, { Request, Response, NextFunction } from 'express';
import middlewares      from './middlewares';
import router  from './router';

const app = express();

app.use(middlewares.json);
app.use(middlewares.text);
app.use(middlewares.urlencoded);
app.use(middlewares.cors);
// app.use((req, res, next) => {
//   console.log(req);
//   next();
// });
app.use(middlewares.awsServerlessExpressMiddleware)


app.use(router);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err : Error, req : Request, res : Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send({
    status: 0,
    error: {
      message: err.message || 'Something went wrong'
    }
  })
});
app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
export default app
