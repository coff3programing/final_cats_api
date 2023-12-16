import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { validate as isUUID } from 'uuid';

import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { Cat, CatsWallpapers } from './entities';
import { CreateCatDto, UpdateCatDto } from './dto';

@Injectable()
export class CatsService {
  //! Logs del Nestjs
  private readonly logger = new Logger('CatsService');

  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(CatsWallpapers)
    private readonly catImageRepository: Repository<CatsWallpapers>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createCatDto: CreateCatDto) {
    try {
      // ? Que apodo le pondras a tu gato, ¿Te ayudo?😉
      const { images = [], ...myCats } = createCatDto,
        cat = this.catRepository.create({
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

  // * Optimizando y aplanando las busquedas
  async findOnePlain(term: string) {
    const { images = [], ...more } = await this.findOne(term);
    return { ...more, images: images.map((url) => url) };
  }

  async update(id: string, updatecatdto: UpdateCatDto) {
    const { images, ...toUpdate } = updatecatdto,
      cat = await this.catRepository.preload({ id, ...toUpdate });

    if (!cat)
      throw new NotFoundException(
        `I can't find this kitten with id ${id}...🐈`,
      );

    const query = this.dataSource.createQueryRunner(); //SQL transactions
    await query.connect();
    await query.startTransaction();

    try {
      if (images) {
        await query.manager.delete(CatsWallpapers, { purrfectpics: { id } });

        cat.images = images.map((url) =>
          this.catImageRepository.create({ url }),
        );
      }

      await query.manager.save(cat);

      await query.commitTransaction();
      await query.release();

      return this.findOnePlain(id);
    } catch (err) {
      await query.rollbackTransaction();
      await query.release();

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

  async PurrPurge() {
    const query = this.catRepository.createQueryBuilder();

    try {
      return await query.delete().where({}).execute();
    } catch (err) {
      this.michisHandleExceptions(err);
    }
  }
}
