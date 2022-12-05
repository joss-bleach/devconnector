import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { JwtDecoded } from 'src/auth/strategy/jwt.strategy';
import { GetCurrentUser } from 'src/user/decorators/current-user.decorator';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createPost(
    @Body() body: CreatePostDto,
    @GetCurrentUser() user: JwtDecoded,
  ) {
    return await this.postService.createPost(user.id, body);
  }
}
