import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { validate as isUUID } from 'uuid';

import { Cat, CatsWallpapers } from './entities';

@Injectable()
export class CatsService {
  //! Logs del Nestjs
  private readonly logger = new Logger('CatsService');

  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(CatsWallpapers)
    private readonly catImageRepository: Repository<CatsWallpapers>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    try {
      // ? Que apodo le pondras a tu gato, ¿Te ayudo?😉
      const { images = [], ...myCats } = createCatDto;

      const cat = this.catRepository.create({
        ...myCats,
        images: images.map((image) =>
          this.catImageRepository.create({ url: image }),
        ),
      });
      await this.catRepository.save(cat);
      return { ...cat, images };
    } catch (err) {
      this.michisHandleExceptions(err);
    }
  }

  // Todo: Pagination
  async findAll({ limit = 10, offset = 0 }: PaginationDto) {
    const cats = await this.catRepository.find({
      take: limit,
      skip: offset,
      relations: { images: true },
    });
    return cats.map(({ images, ...more }) => ({
      ...more,
      images: images.map((url) => url),
    }));
  }

  async findOne(term: string) {
    let cat: Cat;

    if (isUUID(term)) {
      cat = await this.catRepository.findOneBy({ id: term });
    } else {
      const query = this.catRepository.createQueryBuilder('minino');
      cat = await query
        .where(
          'LOWER(gender) =:gender or LOWER(size) =:size or LOWER(breed) =:breed',
          {
            gender: term.toLowerCase(),
            size: term.toLowerCase(),
            breed: term.toLowerCase(),
          },
        )
        .leftJoinAndSelect('minino.images', 'mycat')
        .getOne();
    }

    if (!cat) throw new NotFoundException(`Cat with ${term} not found`);
    return cat;
  }

  async update(id: string, updatecatdto: UpdateCatDto) {
    const cat = await this.catRepository.preload({
      id,
      ...updatecatdto,
      images: [],
    });
    if (!cat)
      throw new NotFoundException(
        `I can't find this kitten with id ${id}...🐈`,
      );

    try {
      await this.catRepository.save(cat);
      return cat;
    } catch (err) {
      this.michisHandleExceptions(err);
    }
  }

  async remove(id: string) {
    const cat = await this.findOne(id);
    await this.catRepository.remove(cat);
  }

  //* Manejando errores
  private michisHandleExceptions(err: any) {
    if (err.code === '500') throw new BadRequestException(err.detail);
    this.logger.error(err);
    throw new InternalServerErrorException(
      '🙈Unexpected error, please verify your code or logs😾',
    );
  }
}
