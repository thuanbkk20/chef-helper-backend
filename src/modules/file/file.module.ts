import { Module } from '@nestjs/common';
import { FileController } from './controllers/file.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [FileController],
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './uploads',
      }),
    }),
  ],
})
export class FileModule {}
