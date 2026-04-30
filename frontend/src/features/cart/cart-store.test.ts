import { useCartStore } from './cart-store';
import { CART_STORAGE_KEY } from '@/constants/config';
import { createBook } from '../../../test/fixtures';

function resetCartStore(): void {
  localStorage.clear();
  useCartStore.setState({ items: [] });
}

describe('cart store', () => {
  beforeEach(() => {
    resetCartStore();
  });

  test('addItem adds a book id to the cart', () => {
    const book = createBook();

    useCartStore.getState().addItem(book.id);

    expect(useCartStore.getState().items).toEqual([
      { bookId: book.id, quantity: 1 },
    ]);
  });

  test('addItem increments quantity and total items for an existing book', () => {
    const book = createBook();

    useCartStore.getState().addItem(book.id);
    useCartStore.getState().addItem(book.id);

    expect(useCartStore.getState().items).toEqual([
      { bookId: book.id, quantity: 2 },
    ]);
    expect(useCartStore.getState().getTotalItems()).toBe(2);
  });

  test('decrementItem lowers quantity and removeItem removes a book', () => {
    const book = createBook();

    useCartStore.getState().addItem(book.id);
    useCartStore.getState().addItem(book.id);
    useCartStore.getState().decrementItem(book.id);

    expect(useCartStore.getState().items).toEqual([
      { bookId: book.id, quantity: 1 },
    ]);

    useCartStore.getState().removeItem(book.id);

    expect(useCartStore.getState().items).toEqual([]);
  });

  test('rehydrates legacy persisted cart data without trusting stale book data', async () => {
    const book = createBook();
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify({
        state: { items: [{ book, quantity: 3 }] },
        version: 0,
      }),
    );

    await useCartStore.persist.rehydrate();

    expect(useCartStore.getState().items).toEqual([
      { bookId: book.id, quantity: 3 },
    ]);
  });
});
