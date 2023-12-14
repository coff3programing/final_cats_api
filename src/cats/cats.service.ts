import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {
  //! Logs del Nestjs
  private readonly logger = new Logger('CatsService');

  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    try {
      // ? Que apodo le pondras a tu gato, ¿Te ayudo?😉
      const cat = this.catRepository.create(createCatDto);
      await this.catRepository.save(cat);
      return cat;
    } catch (err) {
      this.michisHandleExceptions(err);
    }
  }

  findAll() {
    return `This action returns all cats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }

  //* Manejando errores
  private michisHandleExceptions(err: any) {
    if (err.code === '500') throw new BadRequestException(err.detail);
    this.logger.error(err);
    throw new InternalServerErrorException(
      'Unexpected error, please verify your code or logs😾',
    );
  }
}
