/* eslint-disable @typescript-eslint/require-await */
import ServiceBase from '../Base';
import Subscriber from '../../models/Subscriber';
import { dumpSubscriber } from '../dumps';
import Joi from 'joi';

export default class GetSubscribersService extends ServiceBase {
    static validationSchema = Joi.object({
        id: Joi.string().required()
    });
    validate(params : { id: string }): Record<string, unknown> {
        const result = GetSubscribersService.validationSchema.validate(params);

        if (result.error) throw result.error;

        return result.value as { id: string };
    }

    async execute({ id } : { id: string }): Promise<Record<string, unknown>> {
        const subscriber = await Subscriber.findById(id);

        if (!subscriber) throw new Error(`Cannot find subscriber with id = ${id}`);

        return {
            data: dumpSubscriber(subscriber)
        };
    }
}