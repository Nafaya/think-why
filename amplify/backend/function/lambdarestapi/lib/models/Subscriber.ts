import { v4 as uuidv4 } from 'uuid';
import dynamodb from '../singletonDynamoDB';
let tableName = "subscribersDynamo";
if(process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

export interface SubscriberParams {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt?: Date | number;
}
export interface SubscriberObject {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
}

function parseDBSubscriber(obj : SubscriberParams & { createdAt: number }) : SubscriberObject {
    return {
        ...obj,
        createdAt: new Date(obj.createdAt),
    } as SubscriberObject
}

export default class Subscriber {
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
    static tableName = tableName;
    static async create(subscriber : SubscriberParams) : Promise<SubscriberObject> {
        const Item = {
            ...subscriber,
            id        : uuidv4(),
            createdAt : (subscriber.createdAt !== undefined ? new Date(subscriber.createdAt): new Date()).getTime()
        };
        await dynamodb.put({
            TableName : tableName,
            Item,
        }).promise();
        return parseDBSubscriber(Item);
    }
    static async list() : Promise<SubscriberObject[]> {
        const { Items } = await dynamodb.scan({
            TableName : tableName
        }).promise() ;

        if (!Items) throw new Error('!Items');

        return (Items as (SubscriberParams & { createdAt: number })[])?.map(parseDBSubscriber);
    }
    static async findById(id : string) : Promise<SubscriberObject | null> {
        const { Item } = await dynamodb.get({
            TableName : tableName,
            Key: { id }
        }).promise();

        return Item ? parseDBSubscriber(Item as SubscriberParams & { createdAt: number }) : null;
    }
}