import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  findCatImagesByParameter(imgName: string) {
    //* Comprueba si existe este archivo
    const path = join(__dirname, '../../img/uploads', imgName);

    if (!existsSync)
      throw new BadRequestException(`I did not find the kitten ${imgName}🐈`);
    return path;
  }
}
