import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './strategy/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Register a new user
  regsiterUser = async ({ name, email, password }: CreateUserDto) => {
    const checkUserExists = await this.userService.findUserByEmail(email);

    if (checkUserExists) {
      throw new ConflictException(
        'Email address is linked to another account.',
      );
    }

    const newUser = await this.userService.createUser({
      name,
      email,
      password,
    });

    return newUser;
  };

  // Create a JSON web token
  createJwt(user: UserDocument): { token: string } {
    const payload = { sub: user.id, user: user.email };
    return { token: this.jwtService.sign(payload) };
  }

  // Authenticate a user
  authenticateUser = async ({
    email,
    password,
  }: AuthenticateUserDto): Promise<{ token: string }> => {
    const user = await this.userService.findUserByEmail(email);

    let checkUserExists = !!user;
    if (!checkUserExists) {
      throw new NotFoundException('Email address not linked to any account.');
    }

    const checkPasswordsMatch = await bcrypt.compare(password, user.password);
    if (!checkPasswordsMatch) {
      throw new UnauthorizedException();
    }

    return this.createJwt(user);
  };
}
