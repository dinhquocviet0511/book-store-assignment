import type { Book } from '@/types/book';
import type { CartItem } from '@/types/cart';

export function createBook(overrides: Partial<Book> = {}): Book {
  return {
    id: 'book-test',
    sku: 'BHV-TEST',
    title: 'Test Driven TypeScript',
    author: 'Ada Lovelace',
    description: 'A practical book about building reliable TypeScript apps.',
    priceCents: 2500,
    coverImageUrl:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    createdAt: '2026-04-30T00:00:00.000Z',
    ...overrides,
  };
}

export function createCartItem(
  overrides: Partial<CartItem> = {},
): CartItem {
  return {
    book: createBook(),
    quantity: 1,
    ...overrides,
  };
}
