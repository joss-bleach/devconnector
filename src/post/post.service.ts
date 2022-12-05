import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreatePostDto } from './dtos/create-post.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
  ) {}

  findPostById = async (id: string) => {
    const post = await this.postModel
      .findById(id)
      .populate('user', ['name', 'email', 'profileImage'])
      .populate('likes.user', ['name', 'email', 'profileImage']);
    if (!post) {
      throw new NotFoundException('No post found with this ID.');
    }
    return post;
  };

  getAllUserPosts = async (userId: string) => {
    const posts = await this.postModel
      .find({ user: userId })
      .populate('user', ['name', 'email', 'profileImage'])
      .populate('likes.user', ['name', 'email', 'profileImage']);
    if (posts.length === 0) {
      throw new NotFoundException("This user hasn't posted.");
    }
    return posts;
  };

  createPost = async (userId: string, createPostDto: CreatePostDto) => {
    const postData = { ...createPostDto, user: userId };
    const newPost = await this.postModel.create(postData);
    return await newPost.save();
  };

  deletePost = async (postId: string) => {
    return await this.postModel.findByIdAndDelete(postId);
  };

  likePost = async (postId: string, userId: string) => {
    const post = await this.findPostById(postId);
    if (post.likes.some((like) => like.user.toString() === userId)) {
      throw new BadRequestException('User has already liked this post.');
    }

    post.likes.unshift({ user: userId as any });
    return await post.save();
  };

  unlikePost = async (postId: string, userId: string) => {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new NotFoundException('No post found with this ID.');
    }
    if (!post.likes.some((like) => like.user.toString() === userId)) {
      throw new BadRequestException('User has not yet liked this post.');
    }

    post.likes = post.likes.filter(({ user }) => user.toString() !== userId);
    return await post.save();
  };
}
