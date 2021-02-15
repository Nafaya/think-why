import bodyParser from 'body-parser';
import cors       from 'cors';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';

export default {
    json : bodyParser.json({ limit  : 1024 * 1024,
        verify : (req, res, buf) => {
            try {
                JSON.parse(buf.toString());
            } catch (e) {
                throw new Error('Broken json');
            }
        }
    }),
    text         : bodyParser.text({ limit: 1024 * 1024 }),
    urlencoded   : bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 }),
    cors         : cors({ origin: '*' }),
    awsServerlessExpressMiddleware : awsServerlessExpressMiddleware.eventContext()
}