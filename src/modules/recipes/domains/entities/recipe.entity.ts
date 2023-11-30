import { AbstractEntity } from './../../../../common/abstract.entity';
import { CategoryEntity } from './../../../categories/domains/entities/category.entity';
import { IngredientEntity } from './../../../ingredients/domains/entities/ingredient.entity';
import { UserEntity } from './../../../users/domains/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity('recipes')
export class RecipeEntity extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  time: number;

  @Column({ nullable: true })
  calorie: number;

  @Column('varchar', { length: 300 })
  description: string;

  @Column('simple-array')
  images: string[];

  @Column('jsonb', { nullable: false, default: {} })
  guide: string;

  @Column()
  isDraft: boolean;

  @ManyToMany(() => CategoryEntity)
  @JoinTable({ name: 'recipe_category' })
  categories: CategoryEntity[];

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'uploader_id' })
  uploader: UserEntity;

  @ManyToMany(() => IngredientEntity)
  @JoinTable({ name: 'recipe_ingredient' })
  ingredients: IngredientEntity[];
}
