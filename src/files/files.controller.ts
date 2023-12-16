import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';

import { fileFilter, fileNamer } from './helpers';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('cat/:imgName')
  findImgCat(
    // ! Muestrame la Img
    @Res() res: Response,
    @Param('imgName') imgName: string,
  ) {
    const path = this.filesService.findCatImagesByParameter(imgName);
    res.sendFile(path);
  }

  @Post('cat')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter,
      storage: diskStorage({
        destination: './img/uploads',
        filename: fileNamer,
      }),
    }),
  )
  uploadCatImage(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    if (!file)
      throw new BadRequestException(
        "Please upload the picture or gif of the kitten; it can't be left empty.",
      );

    const secureUrl = `${this.configService.get('HOST_NAME')}/files/cat/${
      file.filename
    }`;

    return { secureUrl };
  }
}
