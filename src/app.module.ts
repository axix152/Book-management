import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    // Make environment variables available globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BooksModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
