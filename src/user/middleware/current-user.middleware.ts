import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../user.service';
import { User } from '../user.schema';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
      session?: { id: string };
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.session || {};

    if (id) {
      req.currentUser = await this.userService.findUserById(id);
    }

    next();
  }
}
