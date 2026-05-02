import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';

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

export class ListBooksQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  search?: string;
}

export type FindBooksQuery = {
  limit?: number;
  search?: string;
};
