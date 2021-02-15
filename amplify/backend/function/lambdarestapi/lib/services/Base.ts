/* eslint-disable @typescript-eslint/no-unused-vars */
export default class ServiceBase {
    constructor (protected context : Record<string, unknown> = {}) {}
    validate(params : Record<string, unknown> = {}) : Record<string, unknown> {
        return {};
    }
    async run(params : Record<string, unknown> = {}) : Promise<Record<string, unknown>> {
        return await this.execute(this.validate(params));
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    async execute(params : Record<string, unknown> = {}) : Promise<Record<string, unknown>> {
        throw new Error('Im abstract');
    }
}