'use client';

import { useMemo } from 'react';
import { Container } from '@/components/ui/container';
import { ErrorState } from '@/components/ui/error-state';
import { LoadingState } from '@/components/ui/loading-state';
import { COPY } from '@/constants/copy';
import { useBooks } from '@/hooks/use-books';
import { useHasMounted } from '@/hooks/use-has-mounted';
import type { CartItem } from '@/types/cart';
import { CartItemRow } from './cart-item-row';
import { CartSummary } from './cart-summary';
import { useCartStore } from './cart-store';
import { EmptyCart } from './empty-cart';

export function CartView() {
  const hasMounted = useHasMounted();
  const cartLines = useCartStore((state) => state.items);
  const shouldLoadBooks = hasMounted && cartLines.length > 0;
  const { books, error, isLoading, refetch } = useBooks({
    enabled: shouldLoadBooks,
  });

  const items = useMemo<CartItem[]>(() => {
    const booksById = new Map(books.map((book) => [book.id, book]));

    return cartLines.flatMap((line) => {
      const book = booksById.get(line.bookId);
      return book ? [{ book, quantity: line.quantity }] : [];
    });
  }, [books, cartLines]);

  if (!hasMounted) {
    return (
      <Container className="py-8 sm:py-10">
        <LoadingState label={COPY.cart.loading} />
      </Container>
    );
  }

  return (
    <Container className="py-8 sm:py-10">
      <h1 className="mb-6 text-3xl font-semibold text-ink">
        {COPY.cart.title}
      </h1>

      {cartLines.length === 0 ? (
        <EmptyCart />
      ) : isLoading ? (
        <LoadingState label={COPY.cart.loading} />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItemRow item={item} key={item.book.id} />
            ))}
          </div>
          <CartSummary items={items} />
        </div>
      )}
    </Container>
  );
}
