import { NextFunction, Request, Response } from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';

const JWT_SECRET = process.env['JWT_SECRET'];

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET must be defined in environment variables');
}

const SECRET: string = JWT_SECRET;

interface CustomJWTPayload extends JwtPayload {
    id: string;
    role: "user" | "admin";
}

export function AuthMiddleware(req: Request, res: Response, next: NextFunction): void {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        res.status(401).json({ error: 'Authorization header must start with Bearer' });
        return;
    }

    const token = header.split(" ")[1];
    // if (!header) {
    //     res.status(401).json({ error: 'Authorization header missing' });
    //     return;
    // }

    // const token: string | undefined = header.startsWith("Bearer ") ? header.split(" ")[1] : header;
    if (!token) {
        res.status(401).json({ error: 'Authorization token missing' });
        return;
    }
    try {
        const decoded = jwt.verify(token, SECRET) as CustomJWTPayload; //as unknown as CustomJWTPayload
        req.userId = decoded.id;
        req.user = {
            id: decoded.id,
            role: decoded.role
        };

        next();

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ error: 'Token expired' });
            return;
        }
        res.status(401).json({ error: 'Invalid token' });
        // res.status(401).json({ error: 'Invalid or expired token' });
        // return;
    }
}
