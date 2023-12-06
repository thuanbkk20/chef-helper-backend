import { NotFoundException } from '@nestjs/common';

import { ERROR_USER_NOT_FOUND } from '../filters/constraint-errors';

export class UserNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super({
      message: ERROR_USER_NOT_FOUND,
      error: error || 'User not found',
    });
  }
}
