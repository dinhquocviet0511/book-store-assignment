import { API_URL } from '@/constants/config';
import { BookSchema, type Book } from '@/types/book';

type FetchBooksOptions = {
  cache?: RequestCache;
  limit?: number;
  search?: string;
  signal?: AbortSignal;
};

const BookListSchema = BookSchema.array();

export async function fetchBooks({
  cache,
  limit,
  search,
  signal,
}: FetchBooksOptions = {}): Promise<Book[]> {
  const url = new URL('/api/books', API_URL);

  if (search) {
    url.searchParams.set('search', search);
  }

  if (typeof limit === 'number') {
    url.searchParams.set('limit', String(limit));
  }

  const response = await fetch(url.toString(), { cache, signal });

  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }

  const data: unknown = await response.json();
  return BookListSchema.parse(data);
}
