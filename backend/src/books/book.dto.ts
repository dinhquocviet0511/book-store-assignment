export type BookDto = {
  id: string;
  sku: string;
  title: string;
  author: string;
  description: string;
  priceCents: number;
  coverImageUrl: string;
  createdAt: string;
};

export type FindBooksQuery = {
  limit?: number;
  search?: string;
};
