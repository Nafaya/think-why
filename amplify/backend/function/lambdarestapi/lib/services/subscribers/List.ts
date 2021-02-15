/* eslint-disable @typescript-eslint/require-await */
import ServiceBase from '../Base';
import Subscriber from '../../models/Subscriber';
import { dumpSubscriber } from '../dumps';

export default class ListSubscribersService extends ServiceBase {
    async execute(): Promise<Record<string, unknown>> {
        return {
            data: (await Subscriber.list()).map(dumpSubscriber)
        };
    }
}