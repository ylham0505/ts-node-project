import z from 'zod';

export const productSchema = z.object({
    body: z.object({
        name: z.string().trim().min(3, 'Name is minimum 3 characters').max(50, 'Name must be less than 50 characters'),
        name_ru: z.string().trim().min(3, 'Name minimum is 3 characters').max(50, 'Name in Russian must be less than 50 characters').optional(),
        name_en: z.string().trim().min(3, 'Name minimum is 3 characters').max(50, 'Name in English must be less than 50 characters').optional(),
        image: z.string().trim().optional(),
        stock: z.number().min(0, 'Stock must be a non-negative number'),
        price: z.number().min(0, 'Price must be a non-negative number'),
        description: z.string().trim().max(99, 'Description must be less than 99 characters').optional(),
        category_id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId')
    })
})

export const updateProductSchema = z.object({
    body: productSchema.shape.body.partial().strict().refine(
        (data) => Object.keys(data).length > 0,
        { message: 'At least one field must be provided' }
    )
});

export const productIdSchema = z.object({
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId')
    })
});

export type ProductInput = z.infer<typeof productSchema>['body'];
export type UpdateProductInput = z.infer<typeof updateProductSchema>['body'];
export type ProductIdParams = z.infer<typeof productIdSchema>['params'];