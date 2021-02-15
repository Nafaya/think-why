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
class CreateSubscriberService extends Base_1.default {
    validate(params) {
        const result = CreateSubscriberService.validationSchema.validate(params);
        if (result.error)
            throw result.error;
        return result.value;
    }
    async execute(params) {
        return {
            data: dumps_1.dumpSubscriber(await Subscriber_1.default.create(params))
        };
    }
}
exports.default = CreateSubscriberService;
CreateSubscriberService.validationSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required()
});
