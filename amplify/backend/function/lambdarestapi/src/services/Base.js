"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
class ServiceBase {
    constructor(context = {}) {
        this.context = context;
    }
    validate(params = {}) {
        return {};
    }
    async run(params = {}) {
        return await this.execute(this.validate(params));
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    async execute(params = {}) {
        throw new Error('Im abstract');
    }
}
exports.default = ServiceBase;
