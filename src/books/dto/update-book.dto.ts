import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty({
    description: 'The title of the book (optional for update)',
    example: 'Rich Dad Poor Dad', // Example for Swagger
  })
  title?: string;

  @ApiProperty({
    description: 'The author of the book (optional for update)',
    example: 'Aziz', // Example for Swagger
  })
  author?: string;

  @ApiProperty({
    description: 'The ISBN of the book (optional for update)',
    example: '0-061-96436-0', // Example for Swagger
  })
  isbn?: string;
}
