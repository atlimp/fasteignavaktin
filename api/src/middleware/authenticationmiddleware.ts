import { Request, Response, NextFunction } from 'express';
import UnauthorizedException from '../exceptions/unauthorizedexception';
import { verifyToken } from '../services/authenticationservice';

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    try {
        if (token) {
            const user = await verifyToken(token);
    
            if (user) {
                return next();
            }
        }
    } catch (e: any) {
        console.log(e);
        if (e.name === 'TokenExpiredError')
            throw new UnauthorizedException('Token is expired');
    }

    throw new UnauthorizedException('Token is invalid');
}