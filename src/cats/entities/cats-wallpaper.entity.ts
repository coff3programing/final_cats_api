import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cat } from '.';

@Entity()
export class CatsWallpapers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  @ManyToOne(() => Cat, (cat) => cat.images, { onDelete: 'CASCADE' })
  purrfectpics: Cat;
}
