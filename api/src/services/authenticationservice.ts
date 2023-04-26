import * as jwt from 'jsonwebtoken';
import { getConfigOrDefault } from '../util/util';

export function generateToken(username: string, expiresIn: number) {
    const secret = getConfigOrDefault('JWT_TOKEN_SECRET', '');

    if (!secret) throw new Error('No token secret specified, unable to create token');

    return jwt.sign({ username }, secret, { expiresIn });
}

export function verifyToken(token: string): Promise<string> {
    const secret = getConfigOrDefault('JWT_TOKEN_SECRET', '');
    
    if (!secret) throw new Error('No token secret specified, unable to create token');

    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err: any, user: any) => {

            if (err) reject(err);

            resolve(user);
        });
    });
}