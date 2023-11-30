import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { IsNullable } from '../../../../decorators';
import { RecipeEntity } from '../entities/recipe.entity';
import { GuideStepDto } from './guide-step.dto';

export class CreateRecipeDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  time: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsNullable()
  calorie?: number;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsArray()
  images: string[];

  @ApiProperty()
  guide: GuideStepDto[];

  @ApiProperty()
  @IsArray()
  category: number[];

  @ApiProperty()
  uploader: number;

  @ApiProperty()
  @IsArray()
  ingredients: number[];

  @ApiProperty()
  isDraft: boolean = false;
}

export class RecipeDto extends CreateRecipeDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  constructor(recipe: RecipeEntity) {
    console.log(recipe.categories);
    super();
    this.id = recipe.id;
    this.name = recipe.name;
    this.time = recipe.time;
    this.calorie = recipe.calorie;
    this.description = recipe.description;
    this.images = recipe.images;
    this.guide = JSON.parse(recipe.guide);
    this.category = recipe.categories.map((category) => category.id);
    this.uploader = recipe.uploader.id;
    this.ingredients = recipe.ingredients.map((ingredient) => ingredient.id);
    this.isDraft = recipe.isDraft;
  }
}
