'use client';

import { Trash2 } from 'lucide-react';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { COPY } from '@/constants/copy';
import { formatCurrency } from '@/lib/format';
import type { CartItem } from '@/types/cart';
import { useCartStore } from './cart-store';

type CartItemRowProps = {
  item: CartItem;
};

export function CartItemRow({ item }: CartItemRowProps) {
  const decrementItem = useCartStore((state) => state.decrementItem);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <Card className="flex flex-col gap-4 p-4 sm:flex-row">
      <div className="relative h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
        <Image
          alt={item.book.title}
          className="object-cover"
          fill
          sizes="80px"
          src={item.book.coverImageUrl}
        />
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="text-base font-semibold leading-6 text-ink">
          {item.book.title}
        </h2>
        <p className="mt-1 text-sm text-muted">{item.book.author}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
          <div
            aria-label={`${COPY.cart.quantity} for ${item.book.title}`}
            className="inline-flex items-center rounded-lg border border-slate-300 bg-white"
          >
            <Button
              aria-label={`Decrease ${item.book.title} quantity`}
              className="min-h-9 rounded-r-none border-0 px-3"
              disabled={item.quantity <= 1}
              onClick={() => decrementItem(item.book.id)}
              variant="secondary"
            >
              <Minus aria-hidden="true" size={14} />
            </Button>
            <span className="min-w-9 px-3 text-center text-sm font-semibold text-ink">
              {item.quantity}
            </span>
            <Button
              aria-label={`Increase ${item.book.title} quantity`}
              className="min-h-9 rounded-l-none border-0 px-3"
              onClick={() => incrementItem(item.book.id)}
              variant="secondary"
            >
              <Plus aria-hidden="true" size={14} />
            </Button>
          </div>
          <span>{formatCurrency(item.book.priceCents * item.quantity)}</span>
        </div>
      </div>

      <Button
        aria-label={`${COPY.cart.remove} ${item.book.title}`}
        className="self-start px-3"
        onClick={() => removeItem(item.book.id)}
        variant="danger"
      >
        <Trash2 aria-hidden="true" size={16} />
        <span className="hidden sm:inline">{COPY.cart.remove}</span>
      </Button>
    </Card>
  );
}
