/* eslint-disable @typescript-eslint/require-await */
import ServiceBase from '../Base';
import Subscriber, { SubscriberParams } from '../../models/Subscriber';
import { dumpSubscriber } from '../dumps';
import Joi from 'joi';

export default class CreateSubscriberService extends ServiceBase {
    static validationSchema = Joi.object({
        email: Joi.string().email().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required()
    });
    validate(params : Record<string, unknown> & SubscriberParams): Record<string, unknown> {
        const result = CreateSubscriberService.validationSchema.validate(params);

        if (result.error) throw result.error;

        return result.value as { id: string };
    }
    async execute(params : Record<string, unknown>): Promise<Record<string, unknown>> {
        return {
            data: dumpSubscriber(await Subscriber.create(params as unknown as SubscriberParams))
        };
    }
}