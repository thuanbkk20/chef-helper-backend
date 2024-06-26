import { UserService } from './../../users/services/user.service';
import { IngredientService } from './../../ingredients/services/ingredient.service';
import { CategoryService } from './../../categories/services/category.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateRecipeDto, RecipeDto } from '../domains/dtos/recipe.dto';
import { RecipeRepository } from '../repositories/recipe.repository';
import { RecipeNotFoundException } from '../../../exceptions/recipe-not-found.exception';
import { RecipeEntity } from '../domains/entities/recipe.entity';
import { RecipeQueryDto } from '../domains/dtos/recipe-query.dto';
import { ContextProvider } from '../../../providers';
import { BookmarkDto } from '../domains/dtos/bookmark.dto';
import { RecipePageOptionsDto } from '../domains/dtos/recipe-page-options.dto';
import { PageDto } from '../../../common/dtos/page.dto';
import { PageMetaDto } from '../../../common/dtos/page-meta.dto';

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
    if (recipe === null) {
      throw new RecipeNotFoundException();
    }
    return new RecipeDto(recipe);
  }

  async createNewRecipe(recipe: CreateRecipeDto): Promise<RecipeEntity> {
    const categories = await this.categoryService.getManyByIds(recipe.category);
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

  async getRecipePage(
    pageOptionsDto: RecipePageOptionsDto,
  ): Promise<PageDto<RecipeDto>> {
    const recipeResponse =
      await this.recipeRepository.getRecipePage(pageOptionsDto);
    const recipeRecords = recipeResponse.entities.map(
      (recipe) => new RecipeDto(recipe),
    );
    const itemCount = recipeResponse.itemCount;
    const pageMeta = new PageMetaDto({ pageOptionsDto, itemCount });
    return new PageDto(recipeRecords, pageMeta);
  }

  async findManyByOption(queryOption: RecipeQueryDto): Promise<RecipeDto[]> {
    const recipes = await this.recipeRepository.findManyByOption(queryOption);
    const recipeDtos = recipes.map((recipe) => new RecipeDto(recipe));
    return recipeDtos;
  }

  async bookmarkRecipe(bookmarkDto: BookmarkDto): Promise<string> {
    const authUser = ContextProvider.getAuthUser();
    if (authUser.id != bookmarkDto.userId) {
      throw new UnauthorizedException();
    }
    //
    const recipe = await this.recipeRepository.findOneById(
      bookmarkDto.recipeId,
    );
    if (recipe == null) {
      throw new RecipeNotFoundException();
    }
    const userBookmarkedRecipes =
      await this.userService.getUserBookmarkedRecipes(bookmarkDto.userId);
    // Remove the recipe if it is in the userBookmarkedRecipes, otherwise, add it into userBookmarkedRecipes
    const index = userBookmarkedRecipes.findIndex(
      (bookmarkedRecipe) => bookmarkedRecipe.id === recipe.id,
    );
    let message = 'Bookmark this recipe successfully';
    if (index !== -1) {
      // Element exists, remove it
      userBookmarkedRecipes.splice(index, 1);
      message = 'Unbookmark this recipe successfully';
    } else {
      // Element doesn't exist, add it
      userBookmarkedRecipes.push(recipe);
    }
    authUser.bookmarkedRecipes = userBookmarkedRecipes;
    this.userService.saveUser(authUser);
    return message;
  }

  async findManyByIngredients(ids: number[]): Promise<RecipeDto[]> {
    ids = typeof ids === 'string' ? [ids] : ids;
    ids = ids.map((id) => Number(id));
    const allRecipes = await this.recipeRepository.findAll();
    //Loop through allRecipes to filter recipes that match the requirement
    const matchedRecipe = allRecipes.filter((recipe) => {
      const recipeIngredientIds = recipe.ingredients.map(
        (ingredient) => ingredient.id,
      );
      console.log('recipe ingredient id: ', recipeIngredientIds);
      console.log('ids:', ids);
      return recipeIngredientIds.every((id) => ids.includes(id));
    });
    const recipeDtos = matchedRecipe.map((recipe) => new RecipeDto(recipe));
    return recipeDtos;
  }

  async getUserUploadedRecipeDtos(userId: number): Promise<RecipeDto[]> {
    const recipes: RecipeEntity[] =
      await this.recipeRepository.getUserUploadedRecipes(userId);
    const recipeDtos = recipes.map((recipe) => {
      console.log(recipe);
      return new RecipeDto(recipe);
    });
    return recipeDtos;
  }
}
