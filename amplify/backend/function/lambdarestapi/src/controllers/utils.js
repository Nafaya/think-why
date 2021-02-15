"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeServiceRunner = void 0;
function defaultSuccessResponseHandler(req, res, next, result) {
    res.send(typeof result === 'object' ? { status: 1, ...result } : result);
}
function defaultFailureResponseHandler(req, res, next, error) {
    next(error);
}
function makeServiceRunner(ServiceClass, paramBuilder = () => ({}), contextBuilder = () => ({}), successResponseHandler = defaultSuccessResponseHandler, failureResponseHandler = defaultFailureResponseHandler) {
    return async (req, res, next) => {
        try {
            const context = contextBuilder(req);
            const service = new ServiceClass(context);
            const params = paramBuilder(req);
            const result = await service.run(params);
            successResponseHandler(req, res, next, result);
        }
        catch (e) {
            failureResponseHandler(req, res, next, e);
        }
    };
}
exports.makeServiceRunner = makeServiceRunner;
