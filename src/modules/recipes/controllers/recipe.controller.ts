import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RecipeService } from '../services/recipe.service';
import { CreateRecipeDto, RecipeDto } from '../domains/dtos/recipe.dto';
import { RecipeQueryDto } from '../domains/dtos/recipe-query.dto';
import { Auth } from '../../../decorators/http.decorators';
import { BookmarkDto } from '../domains/dtos/bookmark.dto';
import { IngredientIdsDto } from '../domains/dtos/ingredient-ids.dto';

@Controller('recipe')
@ApiTags('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

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

  @Get(':id')
  @ApiOkResponse({
    description: 'Successfully get recipes',
    type: RecipeDto,
  })
  async getRecipeById(@Param('id') id: number): Promise<RecipeDto> {
    return this.recipeService.findOneById(id);
  }

  @Get()
  @ApiOkResponse({
    description: 'Successfully get recipes',
    type: [RecipeDto],
  })
  async getRecipes(@Query() queryOption: RecipeQueryDto): Promise<RecipeDto[]> {
    return this.recipeService.findManyByOption(queryOption);
  }

  @Post()
  @ApiBody({ type: CreateRecipeDto })
  async createNewRecipe(@Body() recipe: CreateRecipeDto) {
    return this.recipeService.createNewRecipe(recipe);
  }
}
