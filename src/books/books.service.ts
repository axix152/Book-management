import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  // Create a new book
  async create(createBookDto: CreateBookDto): Promise<any> {
    // Check if a book with the same title already exists
    const existingBook = await this.bookModel
      .findOne({ title: createBookDto.title })
      .exec();

    if (existingBook) {
      throw new HttpException(
        {
          message: 'fail',
          error: `A book with the title "${createBookDto.title}" already exists.`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdBook = new this.bookModel(createBookDto);
    const savedBook = await createdBook.save();

    return {
      message: 'success',
      data: savedBook,
    };
  }

  // Get all books
  async findAll(): Promise<any> {
    const books = await this.bookModel.find().exec();

    if (!books || books.length === 0) {
      throw new HttpException(
        {
          message: 'fail',
          error: 'No books found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: 'success',
      data: books,
    };
  }

  // Get a single book by ID
  async findOne(id: string): Promise<any> {
    const book = await this.bookModel.findById(id).exec();

    if (!book) {
      throw new HttpException(
        {
          message: 'fail',
          error: `Book with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: 'success',
      data: book,
    };
  }

  // Update a book by ID
  async update(id: string, updateBookDto: UpdateBookDto): Promise<any> {
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(id, updateBookDto, {
        new: true, // Return the updated document
      })
      .exec();

    if (!updatedBook) {
      throw new HttpException(
        {
          message: 'fail',
          error: `Book with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: 'success',
      data: updatedBook,
    };
  }

  // Delete a book by ID
  async remove(id: string): Promise<any> {
    const result = await this.bookModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new HttpException(
        {
          message: 'fail',
          error: `Book with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: 'success',
      data: {
        message: `Book with ID ${id} has been deleted successfully.`,
      },
    };
  }
}
