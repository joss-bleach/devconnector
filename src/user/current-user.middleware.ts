import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';
import { User } from './user.schema';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      session?: any;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      req.user = await this.userService.findUserById(userId);
    }

    next();
  }
}
