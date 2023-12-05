import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../domains/entities/category.entity';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findOneById(id: number): Promise<CategoryEntity> {
    return this.categoryRepository.findOneBy({ id: id });
  }

  async getAllCategories(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }

  async getManyByIds(ids: number[]): Promise<CategoryEntity[]> {
    return this.categoryRepository.getManyByIds(ids);
  }
}
