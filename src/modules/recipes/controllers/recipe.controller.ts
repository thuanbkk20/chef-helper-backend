import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RecipeService } from '../services/recipe.service';
import { CreateRecipeDto, RecipeDto } from '../domains/dtos/recipe.dto';
import { Auth } from '../../../decorators/http.decorators';
import { BookmarkDto } from '../domains/dtos/bookmark.dto';
import { IngredientIdsDto } from '../domains/dtos/ingredient-ids.dto';
import { RecipeListOkResponse } from '../domains/dtos/recipe-list-ok-response.dto';
import { RecipePageOptionsDto } from '../domains/dtos/recipe-page-options.dto';

@Controller('recipe')
@ApiTags('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  @ApiOkResponse({
    description: 'Successfully get recipes',
    type: RecipeListOkResponse,
  })
  async getRecipes(@Query() queryOption: RecipePageOptionsDto) {
    return this.recipeService.getRecipePage(queryOption);
  }

  @Post()
  @ApiBody({ type: CreateRecipeDto })
  async createNewRecipe(@Body() recipe: CreateRecipeDto) {
    return this.recipeService.createNewRecipe(recipe);
  }

  @Auth()
  @Post('/bookmark')
  @ApiOkResponse({
    description: 'Bookmark recipe',
    type: String,
  })
  async bookmarkRecipe(@Body() bookmarkDto: BookmarkDto): Promise<string> {
    return this.recipeService.bookmarkRecipe(bookmarkDto);
  }

  @Get('/by-ingredient')
  @ApiOkResponse({
    description: 'Successfully get recipes by ingredients',
    type: [RecipeDto],
  })
  async getRecipesByIngredients(
    @Query() ingredientIds: IngredientIdsDto,
  ): Promise<RecipeDto[]> {
    return this.recipeService.findManyByIngredients(ingredientIds.ids);
  }

  @Get('/uploaded-by/:id')
  @ApiOkResponse({
    description: 'Successfully get recipes uploaded by user',
    type: [RecipeDto],
  })
  async getRecipesUploadedByUser(
    @Param('id') id: number,
  ): Promise<RecipeDto[]> {
    return this.recipeService.getUserUploadedRecipeDtos(id);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Successfully get recipes',
    type: RecipeDto,
  })
  async getRecipeById(@Param('id') id: number): Promise<RecipeDto> {
    return this.recipeService.findOneById(id);
  }
}
