import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../domains/entities/user.entity';
import { UserRegisterDto } from '../domains/dtos/user-register.dto';
import { generateHash } from 'src/common/utils';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async registerUser(registerDto: UserRegisterDto): Promise<UserEntity> {
    console.log('aaaa');
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
