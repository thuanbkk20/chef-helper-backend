import { UserRegisterDto } from '@modules/users/domains/dtos/user-register.dto';
import { UserService } from '@modules/users/services/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../domains/dtos/login.dto';
import { validateHash } from '@/common/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async userRegister(registerDto: UserRegisterDto): Promise<any> {
    const user = await this.userService.registerUser(registerDto);
    return {
      accessToken: await this.jwtService.signAsync({
        id: user.id,
      }),
    };
  }

  async userLogin(loginDto: LoginDto): Promise<any> {
    const user = await this.userService.findUserByEmailOrUserName(
      loginDto.userName,
    );
    if (user != null) {
      const isPasswordMatch = validateHash(loginDto.password, user.password);
      if (!isPasswordMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return {
        accessToken: await this.jwtService.signAsync({
          id: user.id,
        }),
      };
    }
    throw new UnauthorizedException('Username not found');
  }
}
