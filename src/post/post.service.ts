import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { async } from 'rxjs';
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
      .populate('user', ['name', 'email', 'profileImage']);
    if (!post) {
      throw new NotFoundException('No post found with this ID.');
    }
    return post;
  };

  getAllUserPosts = async (userId: string) => {
    const posts = await this.postModel
      .find({ user: userId })
      .populate('user', ['name', 'email', 'profileImage']);
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
}
