import { UnauthorizedException } from '@nestjs/common';

export class UserUnauthorizedException extends UnauthorizedException {
  constructor() {
    super(
      {
        id: 'security:user:not_authorized',
        message: 'User not authorized to perform this action',
      },
      {
        description: 'The user is not authorized to perform this action',
      },
    );
  }
}
