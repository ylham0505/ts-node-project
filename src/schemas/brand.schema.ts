import z from 'zod';

export const brandSchema = z.object({
    body: z.object({
        name: z.string().min(3, 'Name is required').max(50, 'Name must be less than 50 characters').trim(),
        image: z.string().optional()
    })
})

export const updateBrandSchema = z.object({
    body: z.object({
        name: z.string()
            .min(3, 'Name must be at least 3 characters')
            .max(50, 'Name must be less than 50 characters')
            .trim()
            .optional(),
        image: z.string()
            .optional()
    }).strict() // запрещает дополнительные поля
});

export const brandIdSchema = z.object({
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId')
    })
});

export type BrandInput = z.infer<typeof brandSchema>['body'];
export type UpdateBrandInput = z.infer<typeof updateBrandSchema>['body'];
export type BrandIdParams = z.infer<typeof brandIdSchema>['params'];