import { Module } from '@nestjs/common';
import { RecipeController } from './controllers/recipe.controller';
import { RecipeRepository } from './repositories/recipe.repository';
import { RecipeService } from './services/recipe.service';
import { UserModule } from '../users/user.module';
import { CategoryModule } from '../categories/category.module';
import { IngredientModule } from '../ingredients/ingredient.module';

@Module({
  imports: [UserModule, CategoryModule, IngredientModule],
  controllers: [RecipeController],
  providers: [RecipeService, RecipeRepository],
  exports: [RecipeService],
})
export class RecipeModule {}
