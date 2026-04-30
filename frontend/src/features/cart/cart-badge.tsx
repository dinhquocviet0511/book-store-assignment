'use client';

import { useHasMounted } from '@/hooks/use-has-mounted';
import { useCartStore } from './cart-store';

export function CartBadge() {
  const hasMounted = useHasMounted();
  const totalItems = useCartStore((state) => state.getTotalItems());

  if (!hasMounted || totalItems === 0) {
    return null;
  }

  return (
    <span
      aria-label={`${totalItems} items in cart`}
      className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-ember px-1.5 text-xs font-semibold text-white"
    >
      {totalItems}
    </span>
  );
}
