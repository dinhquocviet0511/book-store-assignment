import type { Book } from './book';

export type CartLine = {
  bookId: string;
  quantity: number;
};

export type CartItem = {
  book: Book;
  quantity: number;
};
