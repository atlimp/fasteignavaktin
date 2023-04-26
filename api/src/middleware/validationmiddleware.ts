import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import BadRequestException from '../exceptions/badrequestexception';

export async function validate(req: Request, res: Response, next: NextFunction) {
    const errorMessages: string[] = [];
  
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
        errors.array().map(i => i.msg).forEach(el => errorMessages.push(el));
    }
  
    if (errorMessages.length > 0) {
        throw new BadRequestException(errorMessages);
    }
  
    return next();
}