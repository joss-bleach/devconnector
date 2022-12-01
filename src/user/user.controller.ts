import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { GetCurrentUser } from './decorators/current-user.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  async me(@GetCurrentUser() user: any) {
    return await this.userService.findUserByEmail(user.email);
  }
}
