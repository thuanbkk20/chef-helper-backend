import { NotFoundException } from '@nestjs/common';

import { ERROR_RECIPE_NOT_FOUND } from '../filters/constraint-errors';

export class RecipeNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super({
      message: ERROR_RECIPE_NOT_FOUND,
      error: error || 'Recipe not found',
    });
  }
}
