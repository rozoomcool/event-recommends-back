import { Body, Controller, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, ParseFilePipe, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller(
  {
    version: '1'
  }
)
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile(new ParseFilePipeBuilder()
  .addFileTypeValidator({
      fileType: /image\/(jpeg|png|webp|jpg)/,
      skipMagicNumbersValidation: true
    })
    .addMaxSizeValidator({
      maxSize: Math.pow(1024, 2) * 2
    })
    .build({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    })) file: Express.Multer.File) {
  }
}
