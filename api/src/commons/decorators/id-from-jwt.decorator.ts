import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const IdFromJWT = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const payload: string = request['payload'];
    return payload['id'];
  },
);
