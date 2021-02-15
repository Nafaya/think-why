"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const middleware_1 = __importDefault(require("aws-serverless-express/middleware"));
exports.default = {
    json: body_parser_1.default.json({ limit: 1024 * 1024,
        verify: (req, res, buf) => {
            try {
                JSON.parse(buf.toString());
            }
            catch (e) {
                throw new Error('Broken json');
            }
        }
    }),
    text: body_parser_1.default.text({ limit: 1024 * 1024 }),
    urlencoded: body_parser_1.default.urlencoded({ extended: true, limit: 1024 * 1024 }),
    cors: cors_1.default({ origin: '*' }),
    awsServerlessExpressMiddleware: middleware_1.default.eventContext()
};
