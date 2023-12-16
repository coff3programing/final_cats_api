import { Injectable } from '@nestjs/common';
import { CatsService } from 'src/cats/cats.service';
import { initialCatsData } from './data/cats-data';

@Injectable()
export class SeedService {
  constructor(private readonly catsService: CatsService) {}

  async runSeed() {
    await this.CatBulkInsert();
    return 'Seed Excecuted';
  }

  private async CatBulkInsert() {
    await this.catsService.PurrPurge();
    const kitty = initialCatsData.cats;

    const insertPromises = [];
    kitty.forEach((cat) => this.catsService.create(cat));

    await Promise.all(insertPromises);
    return true;
  }
}
