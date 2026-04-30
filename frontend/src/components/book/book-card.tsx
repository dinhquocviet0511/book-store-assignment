'use client';

import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Toast } from '@/components/ui/toast';
import { COPY } from '@/constants/copy';
import { useCartStore } from '@/features/cart/cart-store';
import { formatCurrency } from '@/lib/format';
import type { Book } from '@/types/book';

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!showToast) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setShowToast(false);
    }, 1500);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [showToast]);

  function handleAddToCart(): void {
    addItem(book.id);
    setShowToast(true);
  }

  return (
    <Card className="relative flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[4/5] w-full bg-slate-100">
        <Image
          alt={book.title}
          className="object-cover"
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          src={book.coverImageUrl}
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase text-ember">
            {COPY.book.skuLabel} {book.sku}
          </p>
          <h2 className="mt-2 text-lg font-semibold leading-6 text-ink">
            {book.title}
          </h2>
          <p className="mt-1 text-sm font-medium text-muted">{book.author}</p>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
            {book.description}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-lg font-semibold text-ink">
            {formatCurrency(book.priceCents)}
          </p>
          <Button onClick={handleAddToCart}>
            <ShoppingCart aria-hidden="true" size={16} />
            {COPY.book.addToCart}
          </Button>
        </div>
      </div>

      <Toast message={COPY.book.addedToCart} show={showToast} />
    </Card>
  );
}
