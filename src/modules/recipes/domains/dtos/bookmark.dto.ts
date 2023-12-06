import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class BookmarkDto {
  @ApiProperty()
  @IsNumber()
  recipeId: number;

  @ApiProperty()
  @IsNumber()
  userId: number;
}
