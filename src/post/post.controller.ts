import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { JwtDecoded } from 'src/auth/strategy/jwt.strategy';
import { GetCurrentUser } from 'src/user/decorators/current-user.decorator';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // Create a new post
  @UseGuards(JwtGuard)
  @Post()
  async createPost(
    @Body() body: CreatePostDto,
    @GetCurrentUser() user: JwtDecoded,
  ) {
    return await this.postService.createPost(user.id, body);
  }

  // Delete a post
  @UseGuards(JwtGuard)
  @HttpCode(204)
  @Delete('/:postId')
  async deletePost(@Param('postId') postId: string) {
    return await this.postService.deletePost(postId);
  }

  // Get a post by ID
  @UseGuards(JwtGuard)
  @Get('/:postId')
  async getPostById(@Param('postId') postId: string) {
    return await this.postService.findPostById(postId);
  }

  // Get all posts by user
  @UseGuards(JwtGuard)
  @Get('/user/:userId')
  async getAllUserPosts(@Param('userId') userId: string) {
    return await this.postService.getAllUserPosts(userId);
  }

  // Get all posts
  @UseGuards(JwtGuard)
  @Get()
  async findAllPosts() {
    return await this.postService.getAllPosts();
  }

  // Like a post
  @UseGuards(JwtGuard)
  @Put('/like/:postId')
  async likePost(
    @Param('postId') postId: string,
    @GetCurrentUser() user: JwtDecoded,
  ) {
    return await this.postService.likePost(postId, user.id);
  }

  // Unlike a post
  @UseGuards(JwtGuard)
  @Put('/unlike/:postId')
  async unlikePost(
    @Param('postId') postId: string,
    @GetCurrentUser() user: JwtDecoded,
  ) {
    return await this.postService.unlikePost(postId, user.id);
  }

  // Add a comment to a post
  @UseGuards(JwtGuard)
  @Post('/comment/:postId')
  async addComment(
    @Param('postId') postId: string,
    @GetCurrentUser() user: JwtDecoded,
    @Body() body: CreateCommentDto,
  ) {
    return this.postService.createCommentOnPost(postId, user.id, body);
  }

  // Remove a comment from a post
  @UseGuards(JwtGuard)
  @Delete('/:postId/comment/:commentId')
  async removeComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.postService.removeCommentFromPost(postId, commentId);
  }
}
