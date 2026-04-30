import { Controller, Get, Query } from '@nestjs/common';
import { BookDto } from './book.dto';
import { BooksService } from './books.service';

@Controller('api/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ): Promise<BookDto[]> {
    return this.booksService.findAll({
      limit: limit ? Number(limit) : undefined,
      search,
    });
  }
}
