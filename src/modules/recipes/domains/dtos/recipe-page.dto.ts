import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from '../../../../common/dtos/page-meta.dto';
import { RecipeDto } from './recipe.dto';

export class RecipesPageDto {
  @ApiProperty({ type: [RecipeDto] })
  readonly data: [RecipeDto];

  @ApiProperty({ type: PageMetaDto })
  readonly meta: PageMetaDto;
}
