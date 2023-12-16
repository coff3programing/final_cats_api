import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CatsModule } from 'src/cats/cats.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [CatsModule],
})
export class SeedModule {}
