import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function notFoundMiddleware(req: Request, res: Response, next: NextFunction) {
    return res.status(404).json({ status: 404, message: 'Resource not found' });
}