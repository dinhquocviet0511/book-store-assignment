import { Card } from '@/components/ui/card';
import { COPY } from '@/constants/copy';
import { formatCurrency } from '@/lib/format';
import type { CartItem } from '@/types/cart';

type CartSummaryProps = {
  items: CartItem[];
};

export function CartSummary({ items }: CartSummaryProps) {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.book.priceCents * item.quantity,
    0,
  );

  return (
    <Card className="h-fit p-5">
      <h2 className="text-lg font-semibold text-ink">{COPY.cart.summary}</h2>
      <dl className="mt-5 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-sm text-muted">{COPY.cart.totalItems}</dt>
          <dd className="text-sm font-semibold text-ink">{totalItems}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-4">
          <dt className="text-sm text-muted">{COPY.cart.totalPrice}</dt>
          <dd className="text-lg font-semibold text-ink">
            {formatCurrency(totalPrice)}
          </dd>
        </div>
      </dl>
    </Card>
  );
}
