import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RecipeEntity } from '../domains/entities/recipe.entity';

@Injectable()
export class RecipeRepository extends Repository<RecipeEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RecipeEntity, dataSource.createEntityManager());
  }

  async findOneById(id: number): Promise<RecipeEntity> {
    const query = this.createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.categories', 'category')
      .leftJoinAndSelect('recipe.uploader', 'uploader')
      .leftJoinAndSelect('recipe.ingredients', 'ingredients')
      .where('recipe.id = :id', { id: id });
    return query.getOne();
  }
}
