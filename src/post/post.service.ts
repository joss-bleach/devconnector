import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dtos/create-post.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
  ) {}

  findPostById = async (id: string) => {
    return await this.postModel
      .findById(id)
      .populate('user', ['name', 'email', 'profileImage']);
  };

  createPost = async (userId: string, createPostDto: CreatePostDto) => {
    const postData = { ...createPostDto, user: userId };
    const newPost = await this.postModel.create(postData);
    return await newPost.save();
  };
}
