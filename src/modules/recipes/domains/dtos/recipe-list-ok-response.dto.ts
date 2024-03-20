import { ApiProperty } from '@nestjs/swagger';
import { MetaStatusOkDto } from '../../../../common/dtos/meta-status-ok.dto';
import { RecipesPageDto } from './recipe-page.dto';

export class RecipeListOkResponse {
  @ApiProperty({ type: MetaStatusOkDto })
  meta: MetaStatusOkDto;

  @ApiProperty({ type: RecipesPageDto })
  result: RecipesPageDto;
}
