import { ConflictException } from '@nestjs/common';

export class UserAlreadyAssignedException extends ConflictException {
  constructor() {
    super(
      {
        id: 'security:user:assigned',
        message: 'User already assigned to the task',
      },
      {
        description: 'The user is already assigned to the task',
      },
    );
  }
}
