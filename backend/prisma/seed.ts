import { PrismaClient } from '@prisma/client';
import books from '../database/seed/books.json';

type SeedBook = {
  id: string;
  sku: string;
  title: string;
  author: string;
  description: string;
  priceCents: number;
  coverImageUrl: string;
};

const prisma = new PrismaClient();

async function main(): Promise<void> {
  for (const book of books as SeedBook[]) {
    const bookData = {
      sku: book.sku,
      title: book.title,
      author: book.author,
      description: book.description,
      priceCents: book.priceCents,
      coverImageUrl: book.coverImageUrl,
    };

    await prisma.book.upsert({
      where: { id: book.id },
      update: bookData,
      create: {
        id: book.id,
        ...bookData,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
