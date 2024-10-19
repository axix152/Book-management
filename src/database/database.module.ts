import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // Ensure ConfigModule is available for use in this module
    ConfigModule,
    MongooseModule.forRootAsync({
      // Import ConfigModule to access environment variables
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // Get the MONGO_URI from the env file
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
