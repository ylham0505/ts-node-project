import z from 'zod';

export const categorySchema = z.object({
    body: z.object({
        name: z.string().min(3, 'Name is required').max(50, 'Name must be less than 50 characters').trim(),
        name_ru: z.string().min(3, 'Name minimum is 3 characters').max(50, 'Name in Russian must be less than 50 characters').trim().optional(),
        name_en: z.string().min(3, 'Name minimum is 3 characters').max(50, 'Name in English must be less than 50 characters').trim().optional(),
    })
})

export const updateCategorySchema = z.object({
    body: z.object({
        name: z.string()
            .min(3, 'Name must be at least 3 characters')
            .max(50, 'Name must be less than 50 characters')
            .trim()
            .optional(),
        name_ru: z.string()
            .min(3, 'Name in Russian must be at least 3 characters')
            .max(50, 'Name in Russian must be less than 50 characters')
            .trim()
            .optional(),
        name_en: z.string()
            .min(3, 'Name in English must be at least 3 characters')
            .max(50, 'Name in English must be less than 50 characters')
            .trim()
            .optional(),
    }).strict() // запрещает дополнительные поля
});

export const categoryIdSchema = z.object({
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId')
    })
});

export type CategoryInput = z.infer<typeof categorySchema>['body'];
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>['body'];
export type CategoryIdParams = z.infer<typeof categoryIdSchema>['params'];