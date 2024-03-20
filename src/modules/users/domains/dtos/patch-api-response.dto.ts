import { ApiProperty } from '@nestjs/swagger';

export class PatchAPIResponseDto {
  @ApiProperty()
  message: string;
}
