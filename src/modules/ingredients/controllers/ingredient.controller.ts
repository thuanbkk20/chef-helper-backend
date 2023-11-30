import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IngredientService } from '../services/ingredient.service';
import { IngredientEntity } from '../domains/entities/ingredient.entity';

@ApiTags('ingredient')
@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get()
  getAllIngredients(): Promise<IngredientEntity[]> {
    return this.ingredientService.getAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: number): Promise<IngredientEntity> {
    return this.ingredientService.findOneById(id);
  }
}
