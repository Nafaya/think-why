"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = __importDefault(require("./controllers"));
const router = express_1.default.Router();
const BASE_URL = 'subscribers';
router.post(`/${BASE_URL}`, controllers_1.default.subscribers.create);
router.get(`/${BASE_URL}`, controllers_1.default.subscribers.list);
router.get(`/${BASE_URL}/:id`, controllers_1.default.subscribers.get);
exports.default = router;
