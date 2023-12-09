import { CategoryService } from './../services/category.service';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CategoryEntity } from '../domains/entities/category.entity';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOkResponse({
    description: 'Successfully get all category',
    type: [CategoryEntity],
  })
  async getAllCategory(): Promise<CategoryEntity[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Successfully get category detail',
    type: CategoryEntity,
  })
  async getCategoryById(@Param('id') id: number): Promise<CategoryEntity> {
    return this.categoryService.getCategoryById(id);
  }
}
