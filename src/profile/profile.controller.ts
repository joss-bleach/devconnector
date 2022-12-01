import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { JwtDecoded } from 'src/auth/strategy/jwt.strategy';
import { GetCurrentUser } from 'src/user/decorators/current-user.decorator';
import { CreateEducationDto } from './dtos/create-eduction.dto';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { CreateWorkDto } from './dtos/create-work.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createNewProfile(
    @Body() body: CreateProfileDto,
    @GetCurrentUser() user: JwtDecoded,
  ) {
    return await this.profileService.createProfile(user.id, body);
  }

  @UseGuards(JwtGuard)
  @Get('/me')
  async getMyProfile(@GetCurrentUser() user: JwtDecoded) {
    const currentUserProfile = await this.profileService.findProfileByUserId(
      user.id,
    );
    if (!currentUserProfile) {
      throw new NotFoundException(
        'Cannot find a profile for the current user.',
      );
    }
    return currentUserProfile;
  }

  @UseGuards(JwtGuard)
  @Post('/work')
  async addWorkExperience(
    @Body() body: CreateWorkDto,
    @GetCurrentUser() user: JwtDecoded,
  ) {
    return await this.profileService.addWorkOrEducation(user.id, {
      type: 'work',
      body,
    });
  }

  @UseGuards(JwtGuard)
  @Post('/education')
  async addEducationExperience(
    @Body() body: CreateEducationDto,
    @GetCurrentUser() user: JwtDecoded,
  ) {
    return await this.profileService.addWorkOrEducation(user.id, {
      type: 'education',
      body,
    });
  }
}
