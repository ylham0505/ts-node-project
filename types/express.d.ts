import { JwtPayload as BaseJwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
        userId: string;
        user?: {
            id: string;
            role: 'user' | 'admin';
      };
    }
  }
}
