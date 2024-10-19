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

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // Create a new book
  @Post()
  @ApiTags('Books')
  @ApiBody({ type: CreateBookDto })
  @ApiOperation({ summary: 'Create a new book' })
  @ApiCreatedResponse({
    description: 'Book created successfully',
    schema: {
      example: {
        message: 'success',
        data: {
          _id: '615c1f4d1c4ae4c2f846abc7',
          title: 'Rich Dad Poor Dad',
          author: 'Aziz',
          isbn: '0-061-96436-0',
          createdAt: '2024-10-19T14:27:25.481Z',
          updatedAt: '2024-10-19T14:27:25.481Z',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data or duplicate book title',
    schema: {
      example: {
        message: 'fail',
        error: 'A book with the title "Rich Dad Poor Dad" already exists.',
      },
    },
  })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  // Get all books
  @Get()
  @ApiTags('Books')
  @ApiOperation({
    summary: 'Get all books',
  })
  @ApiOkResponse({
    description: 'Returns a list of books',
    schema: {
      example: {
        message: 'success',
        data: [
          {
            _id: '615c1f4d1c4ae4c2f846abc7',
            title: 'Rich Dad Poor Dad',
            author: 'Aziz',
            isbn: '0-061-96436-0',
            createdAt: '2024-10-19T14:27:25.481Z',
            updatedAt: '2024-10-19T14:27:25.481Z',
          },
          {
            _id: '615c1f4d1c4ae4c2f846abc8',
            title: 'The Lean Startup',
            author: 'Eric Ries',
            isbn: '0-307-88791-1',
            createdAt: '2024-10-19T14:27:25.481Z',
            updatedAt: '2024-10-19T14:27:25.481Z',
          },
        ],
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'No books found',
    schema: {
      example: {
        message: 'fail',
        error: 'No books found',
      },
    },
  })
  findAll() {
    return this.booksService.findAll();
  }

  // Get a single book by ID
  @Get(':id')
  @ApiTags('Books')
  @ApiParam({ name: 'id', type: 'string', description: 'The ID of the book' })
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiOkResponse({
    description: 'Returns a single book',
    schema: {
      example: {
        message: 'success',
        data: {
          _id: '615c1f4d1c4ae4c2f846abc7',
          title: 'Rich Dad Poor Dad',
          author: 'Aziz',
          isbn: '0-061-96436-0',
          createdAt: '2024-10-19T14:27:25.481Z',
          updatedAt: '2024-10-19T14:27:25.481Z',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Book not found',
    schema: {
      example: {
        message: 'fail',
        error: 'Book with ID 615c1f4d1c4ae4c2f846abc7 not found',
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  // Update a book by ID
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
        message: 'success',
        data: {
          _id: '615c1f4d1c4ae4c2f846abc7',
          title: 'Rich Dad Poor Dad',
          author: 'Aziz',
          isbn: '0-061-96436-0',
          createdAt: '2024-10-19T14:27:25.481Z',
          updatedAt: '2024-10-19T14:27:25.481Z',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Book not found',
    schema: {
      example: {
        message: 'fail',
        error: 'Book with ID 615c1f4d1c4ae4c2f846abc7 not found',
      },
    },
  })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  // Delete a book by ID
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
        message: 'success',
        data: {
          message:
            'Book with ID 615c1f4d1c4ae4c2f846abc7 has been deleted successfully.',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Book not found',
    schema: {
      example: {
        message: 'fail',
        error: 'Book with ID 615c1f4d1c4ae4c2f846abc7 not found',
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
