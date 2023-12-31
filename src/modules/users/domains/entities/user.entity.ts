import { RecipeEntity } from './../../../recipes/domains/entities/recipe.entity';
import { AbstractEntity } from '../../../../common/abstract.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  dob: Date;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  fullName: string;

  @ManyToMany(() => RecipeEntity)
  @JoinTable({ name: 'bookmarked_recipes' })
  bookmarkedRecipes: RecipeEntity[];
}
