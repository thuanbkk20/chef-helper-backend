import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RecipeEntity } from '../domains/entities/recipe.entity';
import { RecipeQueryDto } from '../domains/dtos/recipe-query.dto';
import { RecipePageOptionsDto } from '../domains/dtos/recipe-page-options.dto';
import { RecipeResponseDto } from '../domains/dtos/recipe-response.dto';
import { RECIPE_LIST_SORT_FIELD } from '../../../constants/recipe-list-sort-field';

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

  async getUserUploadedRecipes(userId: number): Promise<RecipeEntity[]> {
    const query = this.createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.categories', 'category')
      .leftJoinAndSelect('recipe.uploader', 'uploader')
      .leftJoinAndSelect('recipe.ingredients', 'ingredients')
      .where('uploader.id = :id', { id: userId });
    return query.getMany();
  }

  async getRecipePage(
    pageOptionsDto: RecipePageOptionsDto,
  ): Promise<RecipeResponseDto> {
    const query = this.createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.categories', 'category')
      .leftJoinAndSelect('recipe.uploader', 'uploader')
      .leftJoinAndSelect('recipe.ingredients', 'ingredients');

    //Handle filter
    if (pageOptionsDto.categoryId) {
      query.andWhere('category.id = :id', { id: pageOptionsDto.categoryId });
    }
    if (pageOptionsDto.uploaderId) {
      query.andWhere('uploader.id = :id', { id: pageOptionsDto.uploaderId });
    }
    if (pageOptionsDto.name) {
      const name = pageOptionsDto.name.toLocaleLowerCase();
      query.andWhere('LOWER(recipe.name) LIKE :name', { name: `%${name}%` });
    }

    //Handle sort
    if (
      pageOptionsDto.sortField &&
      pageOptionsDto.sortField != RECIPE_LIST_SORT_FIELD.CREATED_AT
    ) {
      query
        .orderBy('recipe.' + pageOptionsDto.sortField, pageOptionsDto.order)
        .addOrderBy('recipe.id', 'DESC');
    } else {
      query.orderBy('recipe.id', 'DESC');
    }

    const skip = (pageOptionsDto.page - 1) * pageOptionsDto.take;
    // Handle paging
    query.skip(skip).take(pageOptionsDto.take);

    // Retrieve entities
    const itemCount = await query.getCount();
    const entities = await query.getMany();

    return new RecipeResponseDto(entities, itemCount);
  }
}
