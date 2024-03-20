import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsEmail, IsString } from 'class-validator';

export class UserProfileDto {
  @ApiPropertyOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsString()
  avatar?: string;

  @ApiPropertyOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional()
  @IsDate()
  dob?: Date;

  @ApiPropertyOptional()
  @IsString()
  phoneNumber?: string;

  @ApiPropertyOptional()
  @IsString()
  fullName?: string;
}
