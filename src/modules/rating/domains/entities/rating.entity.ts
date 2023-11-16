import { AbstractEntity } from './../../../../common/abstract.entity';
import { RecipeEntity } from './../../../recipes/domains/entities/recipe.entity';
import { UserEntity } from './../../../users/domains/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('rating')
export class RatingEntity extends AbstractEntity {
  @Column()
  point: number;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToOne(() => RecipeEntity)
  @JoinColumn({ name: 'recipe_id' })
  recipe: RecipeEntity;
}
