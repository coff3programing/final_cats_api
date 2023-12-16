import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Cat {
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

  @Column({ type: 'bool' })
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
