import { z } from 'zod';
export declare const BookSchema: z.ZodObject<{
    id: z.ZodString;
    sku: z.ZodString;
    title: z.ZodString;
    author: z.ZodString;
    description: z.ZodString;
    priceCents: z.ZodNumber;
    coverImageUrl: z.ZodString;
    createdAt: z.ZodString;
}, z.core.$strip>;
export type Book = z.infer<typeof BookSchema>;
