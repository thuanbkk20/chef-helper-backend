import { UserService } from './../../users/services/user.service';
import { IngredientService } from './../../ingredients/services/ingredient.service';
import { CategoryService } from './../../categories/services/category.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRecipeDto, RecipeDto } from '../domains/dtos/recipe.dto';
import { RecipeRepository } from '../repositories/recipe.repository';
import { RecipeNotFoundException } from '../../../exceptions/recipe-not-found.exception';
import { RecipeEntity } from '../domains/entities/recipe.entity';
import { RecipeQueryDto } from '../domains/dtos/recipe-query.dto';

@Injectable()
export class RecipeService {
  constructor(
    private readonly recipeRepository: RecipeRepository,
    private readonly categoryService: CategoryService,
    private readonly ingredientService: IngredientService,
    private readonly userService: UserService,
  ) {}

  async getAll(): Promise<RecipeEntity[]> {
    return this.recipeRepository.findAll();
  }

  async findOneById(id: number): Promise<RecipeDto> {
    const recipe = await this.recipeRepository.findOneById(id);
    console.log(recipe);
    if (recipe === null) {
      throw new RecipeNotFoundException();
    }
    return new RecipeDto(recipe);
  }

  async createNewRecipe(recipe: CreateRecipeDto): Promise<RecipeEntity> {
    const categories = await this.categoryService.getManyByIds(recipe.category);
    console.log('aaaa');
    const ingredients = await this.ingredientService.getManyByIds(
      recipe.ingredients,
    );
    const user = await this.userService.findUserById(recipe.uploader);
    const guide = JSON.stringify(recipe.guide);
    const recipeToCreate = {
      ...recipe,
      guide: guide,
      uploader: user,
      categories: categories,
      ingredients: ingredients,
    };
    console.log(recipeToCreate);
    const returnRecipe = await this.recipeRepository.save(recipeToCreate);
    return returnRecipe;
  }

  async getRecipesByCategory(id: number): Promise<RecipeDto[]> {
    const category = this.categoryService.findOneById(id);
    if (!category) {
      throw new BadRequestException('Category not found');
    }
    const recipes = await this.recipeRepository.findManyByCategoryId(id);
    const recipeDtos = recipes.map((recipe) => new RecipeDto(recipe));
    return recipeDtos;
  }

  async findManyByOption(queryOption: RecipeQueryDto): Promise<RecipeDto[]> {
    if (queryOption.isCommon) {
      return [];
    }
    if (queryOption.categoryId) {
      return this.getRecipesByCategory(queryOption.categoryId);
    }
    const recipes = await this.getAll();
    const recipeDtos = recipes.map((recipe) => new RecipeDto(recipe));
    return recipeDtos;
  }
}
