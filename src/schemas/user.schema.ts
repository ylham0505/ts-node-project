import z from 'zod';

export const registerSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Name is required').max(50, 'Name must be less than 50 characters'),
        password: z.string().min(6, 'Password must be at least 6 characters').max(50, 'Password must be less than 50 characters'),
        email: z.string().email('Invalid email address'),
        role: z.enum(['user', 'admin']).optional()
    })
})

export type RegisterInput = z.infer<typeof registerSchema>['body'];