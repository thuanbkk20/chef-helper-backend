import { AbstractEntity } from './../../../../common/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity('ingredients')
export class IngredientEntity extends AbstractEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  description: string;
}
