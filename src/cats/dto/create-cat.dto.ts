import { PickType } from '@nestjs/mapped-types';
import { CatsDto } from './changes-cat.dto';

export class CreateCatDto extends PickType(CatsDto, [
  'name',
  'gender',
  'size',
  'breed',
  'age',
  'personality',
  'info',
  'moniker',
  'status',
]) {}
