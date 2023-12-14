import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ type: 'text', nullable: false })
  gender: string;

  @Column({ type: 'text', nullable: false })
  size: string;

  @Column({ type: 'text', nullable: false })
  breed: string;

  @Column({ type: 'float', default: 0 })
  age: number;

  @Column('text')
  personality: string;

  @Column({ type: 'text' })
  info: string;

  @Column({ type: 'text', nullable: true, unique: true })
  moniker: string;

  @Column({ type: 'bool' })
  status: boolean;

  //! Creando un procedimiento antes de la inserción a la DB
  @BeforeInsert()
  checkMonikerInsert() {
    this.moniker ??= this.name;

    this.moniker = this.moniker
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
