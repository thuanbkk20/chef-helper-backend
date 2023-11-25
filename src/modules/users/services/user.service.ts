import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../domains/entities/user.entity';
import { UserRegisterDto } from '../domains/dtos/user-register.dto';
import { generateHash } from 'src/common/utils';
import { GoogleSignInDto } from '../../auth/domains/dtos/google-sign-in.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findUserById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ id: id });
  }

  async registerUser(registerDto: UserRegisterDto): Promise<UserEntity> {
    try {
      const user = await this.userRepository.insert({
        ...registerDto,
        password: generateHash(registerDto.password),
      });

      return user.raw[0];
    } catch (error) {
      throw new BadRequestException('Email or username has already been used');
    }
  }

  async findUserByEmailOrUserName(input: string): Promise<UserEntity | null> {
    const userByEmail = await this.userRepository.findOneBy({ email: input });
    const userByUserName = await this.userRepository.findOneBy({
      userName: input,
    });
    return userByUserName != null ? userByUserName : userByEmail;
  }

  async findByRequiredInfo(findOptions: object): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy(findOptions);
  }

  async registerByGoogle(registerDto: GoogleSignInDto): Promise<UserEntity> {
    try {
      const user = await this.userRepository.insert({
        ...registerDto,
        password: generateHash(registerDto.password),
      });

      return user.raw[0];
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
