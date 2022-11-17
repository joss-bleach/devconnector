import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtDecoded } from 'src/auth/strategy/jwt.strategy';

interface AuthenticatedRequest extends Request {
  user: JwtDecoded;
}

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest() as AuthenticatedRequest;
    return request.user;
  },
);
