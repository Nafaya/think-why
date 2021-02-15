import { SubscriberParams } from '../models/Subscriber';

export function dumpSubscriber({ id, email, firstName, lastName, createdAt } : Required<SubscriberParams>) : SubscriberParams{
    return {
        id, email, firstName, lastName,
        createdAt : createdAt instanceof Date ? createdAt.getTime() : createdAt
    };
}