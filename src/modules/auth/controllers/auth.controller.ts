import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './../services/auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { UserRegisterDto } from '@modules/users/domains/dtos/user-register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async userRegister(@Body() registerDto: UserRegisterDto) {
    return this.authService.userRegister(registerDto);
  }
}
