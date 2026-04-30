'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { CartBadge } from '@/features/cart/cart-badge';
import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';
import { Container } from './container';

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link
          className="text-xl font-semibold text-ink transition hover:text-accent"
          href={ROUTES.home}
        >
          {COPY.appName}
        </Link>

        <Link
          aria-label={COPY.nav.cartAria}
          className="relative inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-ink transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          href={ROUTES.cart}
        >
          <ShoppingCart aria-hidden="true" size={18} />
          <span>{COPY.nav.cart}</span>
          <CartBadge />
        </Link>
      </Container>
    </header>
  );
}
