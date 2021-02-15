"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/require-await */
const Base_1 = __importDefault(require("../Base"));
const Subscriber_1 = __importDefault(require("../../models/Subscriber"));
const dumps_1 = require("../dumps");
const joi_1 = __importDefault(require("joi"));
class GetSubscribersService extends Base_1.default {
    validate(params) {
        const result = GetSubscribersService.validationSchema.validate(params);
        if (result.error)
            throw result.error;
        return result.value;
    }
    async execute({ id }) {
        const subscriber = await Subscriber_1.default.findById(id);
        if (!subscriber)
            throw new Error(`Cannot find subscriber with id = ${id}`);
        return {
            data: dumps_1.dumpSubscriber(subscriber)
        };
    }
}
exports.default = GetSubscribersService;
GetSubscribersService.validationSchema = joi_1.default.object({
    id: joi_1.default.string().required()
});
