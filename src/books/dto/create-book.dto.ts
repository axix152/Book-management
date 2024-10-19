import { ApiProperty } from '@nestjs/swagger';
import { IsISBN, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    description: 'The Title of the book',
    example: 'Rich Dad Poor Dad',
  })
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  @Length(2, 100, { message: 'Title must be between 2 and 100 characters' })
  title: string;

  @ApiProperty({ description: 'The author of the book', example: 'Aziz' })
  @IsNotEmpty({ message: 'Author is required' })
  @IsString({ message: 'Author must be a string' })
  @Length(2, 30, { message: 'Author must be between 2 and 30 characters' })
  author: string;

  @ApiProperty({
    description: 'The ISBN of the book',
    example: '0-061-96436-0',
  })
  @IsNotEmpty({ message: 'ISBN is required' })
  @IsString({ message: 'ISBN must be a string' })
  @IsISBN(10, { message: 'Invalid ISBN format' }) // Ensure valid ISBN-10 format
  isbn: string;
}
