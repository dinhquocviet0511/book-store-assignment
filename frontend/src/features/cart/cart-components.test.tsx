import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createBook, createCartItem } from '../../../test/fixtures';
import { CartBadge } from './cart-badge';
import { CartItemRow } from './cart-item-row';
import { useCartStore } from './cart-store';

function resetCartStore(): void {
  localStorage.clear();
  useCartStore.setState({ items: [] });
}

describe('cart components', () => {
  beforeEach(() => {
    resetCartStore();
  });

  test('CartBadge shows the current item count', async () => {
    const item = createCartItem({ quantity: 3 });
    useCartStore.setState({
      items: [{ bookId: item.book.id, quantity: item.quantity }],
    });

    render(<CartBadge />);

    expect(await screen.findByText('3')).toBeInTheDocument();
  });

  test('CartItemRow updates quantity and removes the item', async () => {
    const user = userEvent.setup();
    const book = createBook();
    const item = createCartItem({ book, quantity: 1 });
    useCartStore.setState({ items: [{ bookId: book.id, quantity: 1 }] });

    render(<CartItemRow item={item} />);
    await user.click(
      screen.getByRole('button', { name: `Increase ${book.title} quantity` }),
    );

    expect(useCartStore.getState().items).toEqual([
      { bookId: book.id, quantity: 2 },
    ]);

    await user.click(screen.getByRole('button', { name: /remove/i }));

    expect(screen.getByText(book.title)).toBeInTheDocument();
    expect(useCartStore.getState().items).toEqual([]);
  });
});
