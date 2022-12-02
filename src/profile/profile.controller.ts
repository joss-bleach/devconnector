import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
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

  // Create a new user profile
  @UseGuards(JwtGuard)
  @Post()
  async createNewProfile(
    @Body() body: CreateProfileDto,
    @GetCurrentUser() user: JwtDecoded,
  ) {
    return await this.profileService.createProfile(user.id, body);
  }

  @UseGuards(JwtGuard)
  @Patch()
  async updateProfile(
    @Body() body: Partial<CreateProfileDto>,
    @GetCurrentUser() user: JwtDecoded,
  ) {
    return await this.profileService.updateProfileByUserId(user.id, body);
  }

  // Get current user profile
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

  // Add work experience to user profile
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

  // Delete work experience from user profile
  @UseGuards(JwtGuard)
  @Delete('/work/:workId')
  async removeWork(
    @GetCurrentUser() user: JwtDecoded,
    @Param('workId') workId: string,
  ) {
    return await this.profileService.removeWorkOrEducation(user.id, {
      type: 'work',
      id: workId,
    });
  }

  // Update work experience instance on a user profile
  @UseGuards(JwtGuard)
  @Patch('/work/:workId')
  async updateWorkExperience(
    @Body() body: Partial<CreateWorkDto>,
    @GetCurrentUser() user: JwtDecoded,
    @Param('workId') workId: string,
  ) {
    return await this.profileService.updateWorkOrEducation(user.id, {
      type: 'work',
      id: workId,
      body,
    });
  }

  // Add education experience to user profile
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

  // Delete education experience from user profile
  @UseGuards(JwtGuard)
  @Delete('/education/:educationId')
  async removeEducation(
    @GetCurrentUser() user: JwtDecoded,
    @Param('educationId') educationId: string,
  ) {
    return await this.profileService.removeWorkOrEducation(user.id, {
      type: 'education',
      id: educationId,
    });
  }

  // Update education experience instance on a user profile
  @UseGuards(JwtGuard)
  @Patch('/education/:educationId')
  async updateEducationExperience(
    @Body() body: Partial<CreateEducationDto>,
    @GetCurrentUser() user: JwtDecoded,
    @Param('educationId') educationId: string,
  ) {
    return await this.profileService.updateWorkOrEducation(user.id, {
      type: 'education',
      id: educationId,
      body,
    });
  }

  // Toggle looking for work
  @UseGuards(JwtGuard)
  @Patch('/lookingforwork')
  async toggleLookingForWork(@GetCurrentUser() user: JwtDecoded) {
    return await this.profileService.changeLookingForWork(user.id);
  }
}
