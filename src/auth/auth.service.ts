import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

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
}
