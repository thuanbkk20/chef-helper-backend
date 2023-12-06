import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../domains/entities/user.entity';
import { RecipeEntity } from '../../recipes/domains/entities/recipe.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async getUserDetail(userId: number): Promise<UserEntity> {
    const query = this.createQueryBuilder('user')
      .leftJoinAndSelect('user.bookmarkedRecipes', 'bookmarkedRecipes')
      .where('user.id = :id', { id: userId });
    return query.getOne();
  }

  async getUserBookmarkedRecipes(userId: number): Promise<RecipeEntity[]> {
    const user = await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.bookmarkedRecipes', 'bookmarkedRecipe')
      .leftJoinAndSelect('bookmarkedRecipe.categories', 'category')
      .leftJoinAndSelect('bookmarkedRecipe.ingredients', 'ingredient')
      .leftJoinAndSelect('bookmarkedRecipe.uploader', 'uploader')
      .where('user.id = :userId', { userId })
      .getOne();

    return user.bookmarkedRecipes;
  }
}
