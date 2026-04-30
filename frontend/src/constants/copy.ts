export const COPY = {
  appName: 'BookHaven',
  nav: {
    cart: 'Cart',
    cartAria: 'View shopping cart',
  },
  home: {
    kicker: 'Catalog',
    noResultsMessage: 'Try a different title or author.',
    noResultsTitle: 'No books found',
    search: 'Search',
    searchAria: 'Search books by title or author',
    searchPlaceholder: 'Search by title or author',
    title: 'Books for thoughtful software teams',
    subtitle:
      'Browse the collection, add books to your cart, and review your order summary.',
  },
  book: {
    addToCart: 'Add to Cart',
    addedToCart: 'Added to cart',
    skuLabel: 'SKU',
  },
  cart: {
    title: 'Your Cart',
    emptyTitle: 'Your cart is empty',
    emptyMessage: 'Choose a book from the catalog to start an order.',
    continueShopping: 'Continue Shopping',
    loading: 'Loading cart',
    remove: 'Remove',
    quantity: 'Qty',
    summary: 'Order Summary',
    totalItems: 'Total Items',
    totalPrice: 'Total Price',
  },
  state: {
    loading: 'Loading',
    loadingBooks: 'Loading books',
    errorTitle: 'Something went wrong',
    retry: 'Try Again',
    empty: 'Nothing to show',
  },
} as const;
