import { IsNumber } from 'class-validator';

import { NumberField } from '../../../../decorators';
import { RecipeEntity } from '../entities/recipe.entity';

export class RecipeResponseDto {
  entities: RecipeEntity[];

  @NumberField()
  @IsNumber()
  itemCount: number;

  constructor(entities: RecipeEntity[], itemCount: number) {
    this.entities = entities;
    this.itemCount = itemCount;
  }
}
