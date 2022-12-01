import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtDecoded } from 'src/auth/strategy/jwt.strategy';

interface AuthenticatedRequest extends Request {
  user: JwtDecoded;
}

export const GetCurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
