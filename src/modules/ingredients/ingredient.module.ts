import { Module } from '@nestjs/common';
import { IngredientController } from './controllers/ingredient.controller';
import { IngredientService } from './services/ingredient.service';
import { IngredientRepository } from './repositories/ingredient.repository';

@Module({
  controllers: [IngredientController],
  providers: [IngredientService, IngredientRepository],
  exports: [IngredientService],
})
export class IngredientModule {}
