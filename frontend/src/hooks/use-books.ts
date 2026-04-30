'use client';

import { useCallback, useEffect, useState } from 'react';
import { fetchBooks } from '@/lib/api';
import type { Book } from '@/types/book';

type UseBooksResult = {
  books: Book[];
  error: string | null;
  isLoading: boolean;
  refetch: () => void;
};

type UseBooksOptions = {
  enabled?: boolean;
  search?: string;
};

export function useBooks({
  enabled = true,
  search,
}: UseBooksOptions = {}): UseBooksResult {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(enabled);
  const [requestVersion, setRequestVersion] = useState(0);

  const refetch = useCallback(() => {
    setRequestVersion((version) => version + 1);
  }, []);

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();

    async function loadBooks(): Promise<void> {
      setIsLoading(true);
      setError(null);

      try {
        const nextBooks = await fetchBooks({ search, signal: controller.signal });
        setBooks(nextBooks);
      } catch (caughtError) {
        if (controller.signal.aborted) {
          return;
        }

        setError(
          caughtError instanceof Error
            ? caughtError.message
            : 'Failed to fetch books',
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadBooks();

    return () => {
      controller.abort();
    };
  }, [enabled, requestVersion, search]);

  return { books, error, isLoading, refetch };
}
