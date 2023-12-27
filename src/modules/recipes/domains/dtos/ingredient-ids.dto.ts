import { ApiProperty } from '@nestjs/swagger';

export class IngredientIdsDto {
  @ApiProperty({ type: [Number] })
  ids: number[];
}
