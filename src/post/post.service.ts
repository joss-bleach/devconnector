import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { userHasPermission } from 'src/utils/userHasPermission';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { CreatePostDto } from './dtos/create-post.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
  ) {}

  findPostById = async (id: string): Promise<PostDocument | null> => {
    const post = await this.postModel
      .findById(id)
      .populate('user', ['name', 'email', 'profileImage'])
      .populate('likes.user', ['name', 'email', 'profileImage'])
      .populate('comments.user', ['name', 'email', 'profileImage']);
    if (!post) {
      throw new NotFoundException('No post found with this ID.');
    }
    return post;
  };

  getAllUserPosts = async (userId: string): Promise<PostDocument[] | null> => {
    const posts = await this.postModel
      .find({ user: userId })
      .populate('user', ['name', 'email', 'profileImage'])
      .populate('likes.user', ['name', 'email', 'profileImage'])
      .populate('comments.user', ['name', 'email', 'profileImage']);
    if (posts.length === 0) {
      throw new NotFoundException("This user hasn't posted.");
    }
    return posts;
  };

  getAllPosts = async (): Promise<PostDocument[] | null> => {
    const posts = await this.postModel
      .find()
      .populate('user', ['name', 'email', 'profileImage'])
      .populate('likes.user', ['name', 'email', 'profileImage'])
      .populate('comments.user', ['name', 'email', 'profileImage']);
    if (posts.length === 0) {
      throw new NotFoundException('No posts found.');
    }
    return posts;
  };

  createPost = async (
    userId: string,
    createPostDto: CreatePostDto,
  ): Promise<PostDocument | null> => {
    const postData = { ...createPostDto, user: userId };
    const newPost = await this.postModel.create(postData);
    return await newPost.save();
  };

  deletePost = async (postId: string, userId: string): Promise<void> => {
    const deletePost = await this.postModel.findByIdAndDelete(postId);
    userHasPermission(userId, deletePost.user);
    if (!deletePost) {
      throw new InternalServerErrorException('Something went wrong.');
    }
    return;
  };

  likePost = async (
    postId: string,
    userId: string,
  ): Promise<PostDocument | null> => {
    const post = await this.findPostById(postId);
    if (post.likes.some((like) => like.user.toString() === userId)) {
      throw new BadRequestException('User has already liked this post.');
    }

    post.likes.unshift({ user: userId as any });
    return await post.save();
  };

  unlikePost = async (
    postId: string,
    userId: string,
  ): Promise<PostDocument | null> => {
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

  createCommentOnPost = async (
    postId: string,
    userId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<PostDocument | null> => {
    let newComment = {
      user: userId,
      content: createCommentDto.content,
    };
    const createComment = await this.postModel.findOneAndUpdate(
      { _id: postId },
      { $push: { ['comments']: newComment } },
      { new: true },
    );
    if (!createComment) {
      throw new NotFoundException('Could not find post to add comment to.');
    }
    return createComment;
  };

  removeCommentFromPost = async (
    postId: string,
    commentId: string,
  ): Promise<PostDocument | null> => {
    const removeComment = await this.postModel.findOneAndUpdate(
      { _id: postId },
      { $pull: { ['comments']: { _id: commentId } } },
      { new: true },
    );
    if (!removeComment) {
      throw new NotFoundException(
        'Could not find post or comment ID to remove comment from post.',
      );
    }
    return removeComment;
  };
}
