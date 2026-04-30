import { BookCard } from '@/components/book/book-card';
import type { Book } from '@/types/book';

type BookGridProps = {
  books: Book[];
};

export function BookGrid({ books }: BookGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <BookCard book={book} key={book.id} />
      ))}
    </div>
  );
}
