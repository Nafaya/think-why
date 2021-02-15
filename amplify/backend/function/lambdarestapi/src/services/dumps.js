"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dumpSubscriber = void 0;
function dumpSubscriber({ id, email, firstName, lastName, createdAt }) {
    return {
        id, email, firstName, lastName,
        createdAt: createdAt instanceof Date ? createdAt.getTime() : createdAt
    };
}
exports.dumpSubscriber = dumpSubscriber;
