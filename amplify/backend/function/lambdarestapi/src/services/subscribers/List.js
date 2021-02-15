"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/require-await */
const Base_1 = __importDefault(require("../Base"));
const Subscriber_1 = __importDefault(require("../../models/Subscriber"));
const dumps_1 = require("../dumps");
class ListSubscribersService extends Base_1.default {
    async execute() {
        return {
            data: (await Subscriber_1.default.list()).map(dumps_1.dumpSubscriber)
        };
    }
}
exports.default = ListSubscribersService;
