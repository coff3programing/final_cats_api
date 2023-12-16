import { IsArray, IsString } from 'class-validator';
import { CatsWallpapers } from '.';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ type: 'text' })
  gender: string;

  @Column({ type: 'text' })
  size: string;

  @Column({ type: 'text' })
  breed: string;

  @Column({ type: 'numeric', default: 0 })
  age: number;

  @Column({ type: 'text' })
  personality: string;

  @Column({ type: 'text', nullable: true })
  info: string;

  @Column({ type: 'text', unique: true })
  moniker: string;

  //* Add Images
  @OneToMany(
    () => CatsWallpapers,
    (catsWallpapers) => catsWallpapers.purrfectPics,
    { cascade: true, eager: true },
  )
  images?: CatsWallpapers[];

  @Column({ type: 'bool', default: true })
  status: boolean;

  //! Creando un procedimiento antes de la inserción a la DB
  @BeforeInsert()
  catsCheckInserts() {
    this.moniker ??= this.name;

    this.moniker = this.moniker
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  catsCheckUpdate() {
    this.moniker = this.moniker
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
