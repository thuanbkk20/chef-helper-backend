import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RecipeDto } from '../../recipes/domains/dtos/recipe.dto';
import { UserService } from '../services/user.service';
import { Auth } from '../../../decorators/http.decorators';

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
}
