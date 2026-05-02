import { z } from 'zod';

export const BookSchema = z.object({
  id: z.string().min(1),
  sku: z.string().min(1),
  title: z.string().min(1),
  author: z.string().min(1),
  description: z.string(),
  priceCents: z.number().int().nonnegative(),
  coverImageUrl: z.string().url(),
  createdAt: z.string().datetime(),
});

export type Book = z.infer<typeof BookSchema>;
