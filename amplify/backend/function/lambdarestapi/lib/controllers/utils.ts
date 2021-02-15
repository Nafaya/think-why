import ServiceBase from '../services/Base';
import { Response, Request, RequestHandler, NextFunction } from 'express';

function defaultSuccessResponseHandler(req: Request, res: Response, next: NextFunction, result: Record<string, unknown>) {
    res.send(typeof result === 'object' ? { status: 1, ...result } : result);
}
function defaultFailureResponseHandler(req: Request, res: Response, next: NextFunction, error: Error) {
    next(error);
}

export function makeServiceRunner(
    ServiceClass: typeof ServiceBase,
    paramBuilder: (x: Request) => Record<string, unknown> = () => ({}),
    contextBuilder: (x: Request) => Record<string, unknown>  = () => ({}),
    successResponseHandler: (req: Request, res: Response, next: NextFunction, result: Record<string, unknown>) => void = defaultSuccessResponseHandler,
    failureResponseHandler: (req: Request, res: Response, next: NextFunction, error: Error) => void = defaultFailureResponseHandler
) : RequestHandler {
    return async (req, res, next) => {
        try {
            const context = contextBuilder(req);
            const service = new ServiceClass(context);
            const params = paramBuilder(req);
            const result = await service.run(params);

            successResponseHandler(req, res, next, result)
        } catch (e) {
            failureResponseHandler(req, res, next, e);
        }
    }
}
