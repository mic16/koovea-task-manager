import { ConflictException } from '@nestjs/common';

export class UserIsNotOwnerException extends ConflictException {
  constructor() {
    super(
      {
        id: 'security:task:user_is_not_owner',
        message: 'User is not the owner of the task',
      },
      {
        description: 'The user is not the owner of the task',
      },
    );
  }
}
