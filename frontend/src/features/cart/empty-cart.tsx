import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { EmptyState } from '@/components/ui/empty-state';
import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';

export function EmptyCart() {
  return (
    <EmptyState
      action={
        <Link
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          href={ROUTES.home}
        >
          {COPY.cart.continueShopping}
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
      }
      message={COPY.cart.emptyMessage}
      title={COPY.cart.emptyTitle}
    />
  );
}
