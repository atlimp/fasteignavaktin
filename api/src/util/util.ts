import HttpException from '../exceptions/httpexception';
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();


export function isHttpException(test: any): test is HttpException {
    return !test || (test as HttpException).status !== undefined;
}

export function catchAllErrors(fn: (req: Request, res: Response, next: NextFunction) => any) {
    return (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(next);
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function getConfigOrDefault(key: string, _default: any, fn = (x : any) => x) : any {
    return fn(process.env[key]) || _default;
}