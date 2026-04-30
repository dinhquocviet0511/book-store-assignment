import { API_URL } from '@/constants/config';
import type { Book } from '@/types/book';

type FetchBooksOptions = {
  cache?: RequestCache;
  limit?: number;
  search?: string;
  signal?: AbortSignal;
};

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

  return response.json() as Promise<Book[]>;
}
