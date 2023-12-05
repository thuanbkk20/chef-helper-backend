import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RecipeService } from '../services/recipe.service';
import { CreateRecipeDto, RecipeDto } from '../domains/dtos/recipe.dto';
import { RecipeQueryDto } from '../domains/dtos/recipe-query.dto';

@Controller('recipe')
@ApiTags('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

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
