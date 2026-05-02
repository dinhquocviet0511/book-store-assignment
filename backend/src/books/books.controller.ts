import { Controller, Get, Query } from '@nestjs/common';
import { BookDto, ListBooksQueryDto } from './book.dto';
import { BooksService } from './books.service';

@Controller('api/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(@Query() query: ListBooksQueryDto): Promise<BookDto[]> {
    return this.booksService.findAll({
      limit: query.limit,
      search: query.search,
    });
  }
}
