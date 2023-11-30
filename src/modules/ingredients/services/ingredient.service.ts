import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientRepository } from '../repositories/ingredient.repository';
import { IngredientEntity } from '../domains/entities/ingredient.entity';

@Injectable()
export class IngredientService {
  constructor(private readonly ingredientRepository: IngredientRepository) {}

  async getAll(): Promise<IngredientEntity[]> {
    return this.ingredientRepository.find();
  }

  async getManyByIds(ids: number[]): Promise<IngredientEntity[]> {
    return this.ingredientRepository.getManyByIds(ids);
  }

  async findOneById(id: number): Promise<IngredientEntity> {
    const recipe = await this.ingredientRepository.findOneBy({ id: id });
    if (!recipe) {
      throw new NotFoundException('Ingredient not found');
    }
    return recipe;
  }
}
