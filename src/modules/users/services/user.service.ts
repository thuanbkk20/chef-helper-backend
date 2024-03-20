import { UserEntity } from './../domains/entities/user.entity';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserRegisterDto } from '../domains/dtos/user-register.dto';
import { generateHash, validateHash } from 'src/common/utils';
import { GoogleSignInDto } from '../../auth/domains/dtos/google-sign-in.dto';
import { RecipeEntity } from '../../recipes/domains/entities/recipe.entity';
import { UserNotFoundException } from '../../../exceptions/user-not-found.exception';
import { RecipeDto } from '../../recipes/domains/dtos/recipe.dto';
import { ContextProvider } from '../../../providers';
import { ChangePasswordDto } from '../domains/dtos/change-password.dto';
import { JwtService } from '@nestjs/jwt';
import { PatchAPIResponseDto } from '../domains/dtos/patch-api-response.dto';
import { UserProfileDto } from '../domains/dtos/user-profile.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findUserById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ id: id });
  }

  async getUserDetail(id: number): Promise<UserEntity> {
    const user = await this.userRepository.getUserDetail(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
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

  async getUserBookmarkedRecipes(userId: number): Promise<RecipeEntity[]> {
    const user = await this.getUserDetail(userId);
    const authUser = ContextProvider.getAuthUser();
    if (user.id != authUser.id) {
      throw new UnauthorizedException();
    }
    return user.bookmarkedRecipes || [];
    // return this.userRepository.getUserBookmarkedRecipes(userId);
  }

  async getUserBookmarkedRecipeDtos(userId: number): Promise<RecipeDto[]> {
    const recipes: RecipeEntity[] =
      await this.userRepository.getUserBookmarkedRecipes(userId);
    const recipeDtos = recipes.map((recipe) => {
      console.log(recipe);
      return new RecipeDto(recipe);
    });
    return recipeDtos;
  }

  async saveUser(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  async changePassword(
    changePassworDto: ChangePasswordDto,
  ): Promise<PatchAPIResponseDto> {
    if (changePassworDto.currentPassword === changePassworDto.newPassword) {
      throw new BadRequestException(
        'New password must be different from the old one',
      );
    }
    const user = ContextProvider.getAuthUser();
    const userEntity = await this.findByRequiredInfo({ id: user.id });
    console.log(userEntity.password);
    if (user != null) {
      const isPasswordMatch = validateHash(
        changePassworDto.currentPassword,
        userEntity.password,
      );
      if (!isPasswordMatch) {
        throw new UnauthorizedException('Wrong password');
      }
      userEntity.password = generateHash(changePassworDto.newPassword);
      this.userRepository.save(userEntity);
      return { message: 'Change password successfully!' };
    }
  }

  async updateProfile(
    updateProfileDto: UserProfileDto,
  ): Promise<PatchAPIResponseDto> {
    const user = ContextProvider.getAuthUser();
    await this.userRepository.update({ id: user.id }, updateProfileDto);
    return { message: 'Update profile successfully!' };
  }
}
