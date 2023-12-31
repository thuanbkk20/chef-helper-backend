import {
  Controller,
  UploadedFile,
  UseInterceptors,
  Post,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';

@ApiTags('file')
@Controller('file')
export class FileController {
  // constructor(private readonly fileService: FileService) {}
  constructor() {}

  @Post('/image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          // Preserve the original file extension
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const originalname = file.originalname;
          const extension = originalname.slice(
            (Math.max(0, originalname.lastIndexOf('.')) || Infinity) + 1,
          );
          callback(null, `${uniqueSuffix}.${extension}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadImage(@UploadedFile() file: Express.Multer.File): string {
    const imageUrl = `${process.env.BASE_URL}/uploads/${file.filename}`;
    return imageUrl;
  }
}
