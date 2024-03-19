import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RecipeDto } from '../../recipes/domains/dtos/recipe.dto';
import { UserService } from '../services/user.service';
import { Auth } from '../../../decorators/http.decorators';
import { ChangePasswordDto } from '../domains/dtos/change-password.dto';
import { PatchAPIResponseDto } from '../domains/dtos/patch-api-response.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @ApiOkResponse({
    description: 'Successfully get user bookmarked recipes',
    type: [RecipeDto],
  })
  @Get(':id/bookmark-recipes')
  async getUserBookmarkedRecipes(
    @Param('id') userId: number,
  ): Promise<RecipeDto[]> {
    return this.userService.getUserBookmarkedRecipeDtos(userId);
  }

  @Auth()
  @ApiOkResponse({
    description: 'Change password successfully',
    type: PatchAPIResponseDto,
  })
  @Patch('/change-password')
  async changeUserPassword(
    @Body() body: ChangePasswordDto,
  ): Promise<PatchAPIResponseDto> {
    return this.userService.changePassword(body);
  }
}
