import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RecipeEntity } from '../domains/entities/recipe.entity';
import { RecipeQueryDto } from '../domains/dtos/recipe-query.dto';

@Injectable()
export class RecipeRepository extends Repository<RecipeEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RecipeEntity, dataSource.createEntityManager());
  }

  async findAll(): Promise<RecipeEntity[]> {
    const query = this.createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.categories', 'category')
      .leftJoinAndSelect('recipe.uploader', 'uploader')
      .leftJoinAndSelect('recipe.ingredients', 'ingredients');
    return query.getMany();
  }

  async findOneById(id: number): Promise<RecipeEntity> {
    const query = this.createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.categories', 'category')
      .leftJoinAndSelect('recipe.uploader', 'uploader')
      .leftJoinAndSelect('recipe.ingredients', 'ingredients')
      .where('recipe.id = :id', { id: id });
    return query.getOne();
  }

  async findManyByCategoryId(id: number): Promise<RecipeEntity[]> {
    const query = this.createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.categories', 'category')
      .leftJoinAndSelect('recipe.uploader', 'uploader')
      .leftJoinAndSelect('recipe.ingredients', 'ingredients')
      .where('category.id = :id', { id: id });
    return query.getMany();
  }

  async findManyByOption(queryOption: RecipeQueryDto): Promise<RecipeEntity[]> {
    const query = this.createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.categories', 'category')
      .leftJoinAndSelect('recipe.uploader', 'uploader')
      .leftJoinAndSelect('recipe.ingredients', 'ingredients');
    if (queryOption.search) {
      const searchParam = queryOption.search.trim().toLowerCase();
      console.log(searchParam);
      query.where('LOWER(recipe.name) LIKE :name', {
        name: `%${searchParam}%`,
      });
    }
    if (!queryOption.isCommon && queryOption.categoryId) {
      query.where('category.id = :id', { id: queryOption.categoryId });
    }
    return query.getMany();
  }
}
