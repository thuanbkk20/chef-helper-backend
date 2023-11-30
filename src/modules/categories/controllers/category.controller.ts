import { CategoryService } from './../services/category.service';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryEntity } from '../domains/entities/category.entity';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategory(): Promise<CategoryEntity[]> {
    return this.categoryService.getAllCategories();
  }
}
