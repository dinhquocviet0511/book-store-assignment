import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  test('passes parsed list query options to the service', async () => {
    const service = {
      findAll: jest.fn().mockResolvedValue([]),
    } as unknown as BooksService;
    const controller = new BooksController(service);

    await controller.findAll({ limit: 12, search: 'typescript' });

    expect(service.findAll).toHaveBeenCalledWith({
      limit: 12,
      search: 'typescript',
    });
  });
});
