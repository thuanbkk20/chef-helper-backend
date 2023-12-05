import { ApiPropertyOptional } from '@nestjs/swagger';

export class RecipeQueryDto {
  @ApiPropertyOptional()
  categoryId?: number;

  @ApiPropertyOptional()
  isCommon?: boolean;
}
