import { Request, Response, NextFunction } from 'express';
import errorHandler from '../helpers/errorhendller.helper';
import jwt from 'jsonwebtoken';

const APP_SECRET: string | undefined = process.env.APP_SECRET;

interface AuthRequet extends Request{
    user: any
}

const authMiddleware = (req: AuthRequet, res: Response, next: NextFunction) => {
    try {
        const { authorization: auth } = req.headers;
        if (!auth || !auth.startsWith("Bearer ")) {
            throw new Error("unauthorized");
        }
        if(!APP_SECRET){
            throw Error('APP_SECRET not found')
        }
        const token = auth.slice(7);
        req.user = jwt.verify(token, APP_SECRET) as any
        return next();
    } catch (error) {
        return errorHandler(error, res);
    }
};

export default authMiddleware;
