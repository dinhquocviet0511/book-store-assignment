import { PrismaService } from '../prisma/prisma.service';
import { BooksService } from './books.service';

describe('BooksService', () => {
  test('returns bounded public book DTOs from the database', async () => {
    const createdAt = new Date('2026-04-30T00:00:00.000Z');
    const findMany = jest.fn().mockResolvedValue([
      {
        id: 'book-001',
        sku: 'BHV-001',
        title: 'Effective TypeScript',
        author: 'Dan Vanderkam',
        description: 'Concrete TypeScript guidance.',
        priceCents: 4499,
        coverImageUrl: 'https://images.unsplash.com/book.jpg',
        createdAt,
      },
    ]);
    const prisma = {
      book: { findMany },
    } as unknown as PrismaService;
    const service = new BooksService(prisma);

    const books = await service.findAll({ limit: 250, search: 'typescript' });

    expect(findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        sku: true,
        title: true,
        author: true,
        description: true,
        priceCents: true,
        coverImageUrl: true,
        createdAt: true,
      },
      take: 100,
      where: {
        OR: [
          { title: { contains: 'typescript', mode: 'insensitive' } },
          { author: { contains: 'typescript', mode: 'insensitive' } },
        ],
      },
    });
    expect(books).toEqual([
      {
        id: 'book-001',
        sku: 'BHV-001',
        title: 'Effective TypeScript',
        author: 'Dan Vanderkam',
        description: 'Concrete TypeScript guidance.',
        priceCents: 4499,
        coverImageUrl: 'https://images.unsplash.com/book.jpg',
        createdAt: createdAt.toISOString(),
      },
    ]);
  });
});
