import { NotFoundException } from '@nestjs/common';

export class TaskNotFoundException extends NotFoundException {
  constructor() {
    super(
      {
        id: 'security:task:not_found',
        message: 'Task not found',
      },
      {
        description: 'The task was not found',
      },
    );
  }
}
