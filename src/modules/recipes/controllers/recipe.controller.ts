import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RecipeService } from '../services/recipe.service';
import { CreateRecipeDto, RecipeDto } from '../domains/dtos/recipe.dto';

@Controller('recipe')
@ApiTags('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get(':id')
  async getRecipeById(@Param('id') id: number): Promise<RecipeDto> {
    return this.recipeService.findOneById(id);
  }

  @Post()
  @ApiBody({ type: CreateRecipeDto })
  async createNewRecipe(@Body() recipe: CreateRecipeDto) {
    return this.recipeService.createNewRecipe(recipe);
  }
}
