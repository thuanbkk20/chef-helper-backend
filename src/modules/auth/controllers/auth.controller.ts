import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './../services/auth.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserRegisterDto } from '@modules/users/domains/dtos/user-register.dto';
import { LoginDto } from '../domains/dtos/login.dto';
import { ContextProvider } from '@/providers/context.provider';
import { Auth } from '@/decorators/http.decorators';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async userRegister(@Body() registerDto: UserRegisterDto) {
    return this.authService.userRegister(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.userLogin(loginDto);
  }

  @Auth()
  @Get('profile')
  getProfile() {
    return ContextProvider.getAuthUser();
  }

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
}
