import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return this.authService.regsiterUser(body);
  }

  @Post('authenticate')
  async authenticate(@Body() body: AuthenticateUserDto) {
    return this.authService.authenticateUser(body);
  }
}
