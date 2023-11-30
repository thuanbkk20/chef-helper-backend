import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GuideStepDto {
  @ApiProperty()
  description: string;

  @ApiPropertyOptional()
  image?: string;
}
