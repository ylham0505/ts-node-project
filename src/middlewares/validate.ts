import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    } 
    catch (err) {
        if (err instanceof ZodError) {
            return res.status(400).json({
                error: 'Validation error',
                details: err.issues.map(issue => ({
                    field: issue.path.join('.'),
                    message: issue.message
                }))
            });
        }
        return res.status(500).json(err)
    }
}