import { ConflictException } from '@nestjs/common';

export class UserNotAssignedException extends ConflictException {
  constructor() {
    super(
      {
        id: 'security:user:not_assigned',
        message: 'User is not assigned to the task',
      },
      {
        description: 'The user is not assigned to the task',
      },
    );
  }
}
