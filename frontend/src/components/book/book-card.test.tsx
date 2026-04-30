import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCartStore } from '@/features/cart/cart-store';
import { createBook } from '../../../test/fixtures';
import { BookCard } from './book-card';

function resetCartStore(): void {
  localStorage.clear();
  useCartStore.setState({ items: [] });
}

describe('BookCard', () => {
  beforeEach(() => {
    resetCartStore();
  });

  test('renders title, author, price, and SKU', () => {
    const book = createBook();

    render(<BookCard book={book} />);

    expect(screen.getByText(book.title)).toBeInTheDocument();
    expect(screen.getByText(book.author)).toBeInTheDocument();
    expect(screen.getByText('$25.00')).toBeInTheDocument();
    expect(screen.getByText(/BHV-TEST/)).toBeInTheDocument();
  });

  test('adds the book to cart and shows feedback', async () => {
    const user = userEvent.setup();
    const book = createBook();

    render(<BookCard book={book} />);
    await user.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(useCartStore.getState().items).toEqual([
      { bookId: book.id, quantity: 1 },
    ]);
    expect(await screen.findByText('Added to cart')).toBeInTheDocument();
  });
});
