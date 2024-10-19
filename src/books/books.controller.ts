import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

// @Controller('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // create a new book
  @Post()
  @ApiTags('Books')
  @ApiBody({ type: CreateBookDto })
  @ApiOperation({ summary: 'Create a new book' })
  @ApiCreatedResponse({
    description: 'Book created successfully',
    schema: {
      example: {
        _id: '615c1f4d1c4ae4c2f846abc7',
        title: 'Rich Dad Poor Dad',
        author: 'Aziz',
        isbn: '0-061-96436-0',
        createdAt: '2024-10-19T14:27:25.481Z',
        updatedAt: '2024-10-19T14:27:25.481Z',
        __v: 0,
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  // get all books
  @Get()
  @ApiTags('Books')
  @ApiOperation({
    summary: 'Get all books',
  })
  @ApiOkResponse({
    description: 'Returns a list of books',
    schema: {
      example: [
        {
          _id: '615c1f4d1c4ae4c2f846abc7',
          title: 'Rich Dad Poor Dad',
          author: 'Aziz',
          isbn: '0-061-96436-0',
          createdAt: '2024-10-19T14:27:25.481Z',
          updatedAt: '2024-10-19T14:27:25.481Z',
          __v: 0,
        },
        {
          _id: '615c1f4d1c4ae4c2f846abc8',
          title: 'The Lean Startup',
          author: 'Eric Ries',
          isbn: '0-307-88791-1',
          createdAt: '2024-10-19T14:27:25.481Z',
          updatedAt: '2024-10-19T14:27:25.481Z',
          __v: 0,
        },
      ],
    },
  })
  @ApiNotFoundResponse({ description: 'No books found' })
  findAll() {
    return this.booksService.findAll();
  }

  // get a single book by id
  @Get(':id')
  @ApiTags('Books')
  @ApiParam({ name: 'id', type: 'string', description: 'The ID of the book' })
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiOkResponse({
    description: 'Returns a single book',
    schema: {
      example: {
        _id: '615c1f4d1c4ae4c2f846abc7',
        title: 'Rich Dad Poor Dad',
        author: 'Aziz',
        isbn: '0-061-96436-0',
        createdAt: '2024-10-19T14:27:25.481Z',
        updatedAt: '2024-10-19T14:27:25.481Z',
        __v: 0,
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Book not found' })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  // update a book by id
  @Patch(':id')
  @ApiTags('Books')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID of the book to update',
  })
  @ApiOperation({ summary: 'Update a book by ID' })
  @ApiOkResponse({
    description: 'Book updated successfully',
    schema: {
      example: {
        _id: '615c1f4d1c4ae4c2f846abc7',
        title: 'Rich Dad Poor Dad',
        author: 'Aziz',
        isbn: '0-061-96436-0',
        createdAt: '2024-10-19T14:27:25.481Z',
        updatedAt: '2024-10-19T14:27:25.481Z',
        __v: 0,
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Book not found' })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  // delete a book by id
  @Delete(':id')
  @ApiTags('Books')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID of the book to delete',
  })
  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiOkResponse({
    description: 'Book deleted successfully',
    schema: {
      example: {
        message: 'Book with ID 615c1f4d1c4ae4c2f846abc7 has been deleted.',
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Book not found' })
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
