import { UserRegisterDto } from '@modules/users/domains/dtos/user-register.dto';
import { UserService } from '@modules/users/services/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../domains/dtos/login.dto';
import { validateHash } from '@/common/utils';
import { OAuthException } from '../../../exceptions/oauth.exception';
import { GoogleSignInDto } from '../domains/dtos/google-sign-in.dto';

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

  async userRegisterByGoogle(registerDto: GoogleSignInDto) {
    const user = await this.userService.registerByGoogle(registerDto);
    return {
      accessToken: await this.jwtService.signAsync({
        id: user.id,
      }),
    };
  }

  async googleLogin(req: any) {
    if (!req.user) {
      throw new OAuthException();
    }
    // Find if user exist in application
    const userInApp = await this.userService.findByRequiredInfo({
      userName: req.user.email,
    });

    if (userInApp === null) {
      const user = {
        userName: req.user.email,
        email: req.user.email,
        fullName: req.user.lastName + ' ' + req.user.firstName,
        password: req.user.email,
        avatar: req.user.picture,
      };
      return this.userRegisterByGoogle(user);
    } else {
      const payload = {
        id: userInApp.id,
      };
      return {
        accessToken: await this.jwtService.signAsync(payload),
      };
    }
  }
}
