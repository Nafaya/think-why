"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Create_1 = __importDefault(require("../services/subscribers/Create"));
const Get_1 = __importDefault(require("../services/subscribers/Get"));
const List_1 = __importDefault(require("../services/subscribers/List"));
const utils_1 = require("./utils");
exports.default = {
    create: utils_1.makeServiceRunner(Create_1.default, req => ({ ...req.body })),
    get: utils_1.makeServiceRunner(Get_1.default, req => ({ ...req.params })),
    list: utils_1.makeServiceRunner(List_1.default)
};
