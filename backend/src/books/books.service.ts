import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { BookDto, FindBooksQuery } from './book.dto';

const DEFAULT_BOOK_LIMIT = 50;
const MAX_BOOK_LIMIT = 100;

const bookSelect = {
  id: true,
  sku: true,
  title: true,
  author: true,
  description: true,
  priceCents: true,
  coverImageUrl: true,
  createdAt: true,
} satisfies Prisma.BookSelect;

type SelectedBook = Prisma.BookGetPayload<{ select: typeof bookSelect }>;

function toBookDto(book: SelectedBook): BookDto {
  return {
    id: book.id,
    sku: book.sku,
    title: book.title,
    author: book.author,
    description: book.description,
    priceCents: book.priceCents,
    coverImageUrl: book.coverImageUrl,
    createdAt: book.createdAt.toISOString(),
  };
}

function normalizeLimit(limit?: number): number {
  if (!limit || !Number.isFinite(limit)) {
    return DEFAULT_BOOK_LIMIT;
  }

  return Math.min(Math.max(Math.floor(limit), 1), MAX_BOOK_LIMIT);
}

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: FindBooksQuery = {}): Promise<BookDto[]> {
    const search = query.search?.trim();

    const books = await this.prisma.book.findMany({
      select: bookSelect,
      take: normalizeLimit(query.limit),
      where: search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { author: { contains: search, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: { createdAt: 'desc' },
    });

    return books.map(toBookDto);
  }
}
