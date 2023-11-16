import { AbstractEntity } from './../../../../common/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity('category')
export class CategoryEntity extends AbstractEntity {
  @Column({ unique: true })
  name: string;
}
