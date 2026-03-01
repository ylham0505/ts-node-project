import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { generateToken } from "../utils/token";

const userService = new UserService();

export class UserController {
    async register(req: Request, res: Response) {
        try {
            const user = await userService.register(req.body)
            return res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
            });
        } catch (error: any) {
            if (error.message === 'User already exists') {
                return res.status(409).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const user = await userService.login(req.body);
            const token = generateToken(user._id.toString(), user.role);
            return res.status(200).json({
                message: 'Login successful',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token,
            });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
    
}