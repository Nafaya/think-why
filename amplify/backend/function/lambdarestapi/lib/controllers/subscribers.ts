import Create from '../services/subscribers/Create';
import Get from '../services/subscribers/Get';
import List from '../services/subscribers/List';
import { makeServiceRunner } from './utils';
export default {
    create : makeServiceRunner(Create, req => ({ ...req.body } as Record<string, unknown>)),
    get    : makeServiceRunner(Get, req => ({ ...req.params })),
    list   : makeServiceRunner(List)
}