import { UserRegisterDto } from '@modules/users/domains/dtos/user-register.dto';
import { UserService } from '@modules/users/services/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async userRegister(registerDto: UserRegisterDto): Promise<any> {
    const user = await this.userService.registerUser(registerDto);
    console.log(user);
    return {
      accessToken: await this.jwtService.signAsync({
        id: user.id,
        // id: 1,
      }),
    };
  }
}
