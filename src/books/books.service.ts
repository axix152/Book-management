import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  // Create a new book
  async create(createBookDto: CreateBookDto): Promise<Book> {
    // Check if a book with the same title already exists
    const existingBook = await this.bookModel
      .findOne({ title: createBookDto.title })
      .exec();
    if (existingBook) {
      throw new BadRequestException(
        `A book with the title "${createBookDto.title}" already exists.`,
      );
    }

    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }

  // Get all books
  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  // Get a single book by ID
  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  // Update a book by ID
  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(id, updateBookDto, {
        new: true, // Return the updated document
      })
      .exec();

    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return updatedBook;
  }

  // Delete a book by ID
  async remove(id: string): Promise<void> {
    const result = await this.bookModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }
}
