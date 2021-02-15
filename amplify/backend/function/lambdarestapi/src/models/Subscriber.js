"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const singletonDynamoDB_1 = __importDefault(require("../singletonDynamoDB"));
let tableName = "subscribersDynamo";
if (process.env.ENV && process.env.ENV !== "NONE") {
    tableName = tableName + '-' + process.env.ENV;
}
function parseDBSubscriber(obj) {
    return {
        ...obj,
        createdAt: new Date(obj.createdAt),
    };
}
class Subscriber {
    static async create(subscriber) {
        const Item = {
            ...subscriber,
            id: uuid_1.v4(),
            createdAt: (subscriber.createdAt !== undefined ? new Date(subscriber.createdAt) : new Date()).getTime()
        };
        await singletonDynamoDB_1.default.put({
            TableName: tableName,
            Item,
        }).promise();
        return parseDBSubscriber(Item);
    }
    static async list() {
        var _a;
        const { Items } = await singletonDynamoDB_1.default.scan({
            TableName: tableName
        }).promise();
        if (!Items)
            throw new Error('!Items');
        return (_a = Items) === null || _a === void 0 ? void 0 : _a.map(parseDBSubscriber);
    }
    static async findById(id) {
        const { Item } = await singletonDynamoDB_1.default.get({
            TableName: tableName,
            Key: { id }
        }).promise();
        return Item ? parseDBSubscriber(Item) : null;
    }
}
exports.default = Subscriber;
// id: string;
// email: string;
// firstName: string;
// lastName: string;
// createdAt: Date;
// constructor({ id, email, firstName, lastName, createdAt } : SubscriberParams) {
//     this.id = id;
//     this.email = email;
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.createdAt = createdAt ? new Date(createdAt) : new Date();
// }
Subscriber.tableName = tableName;
