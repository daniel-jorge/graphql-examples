import {
  Resolver,
  Query,
  Authorized,
  Ctx,
  Arg,
  Int,
  FieldResolver,
  Root,
  Args,
} from 'type-graphql';
import { Post } from './post.entity';
import { Context } from '../context.interface';
import { User } from '../user/user.entity';
import { Comment } from '../comment/comment.entity';
import { GetPaginationArgs } from '../shared/first.args';

@Resolver(of => Post)
export class PostResolver {
  @Authorized()
  @Query(returns => [Post], { nullable: 'items' })
  posts(@Ctx() ctx: Context, @Args() { take, skip }: GetPaginationArgs): Promise<Post[]> {
    return ctx.dataSources.posts.getPosts(take, skip);
  }

  @Authorized()
  @Query(returns => Post, { nullable: true })
  post(@Ctx() ctx: Context, @Arg('id', type => Int) id: number): Promise<Post> {
    return ctx.dataSources.posts.getPost(id);
  }

  @Authorized()
  @FieldResolver()
  user(@Ctx() ctx: Context, @Root() post: Post): Promise<User> {
    return ctx.dataSources.users.getUser(post.userId);
  }

  @Authorized()
  @FieldResolver()
  comments(
    @Ctx() ctx: Context,
    @Root() post: Post,
    @Args() { take, skip }: GetPaginationArgs,
  ): Promise<Comment[]> {
    return ctx.dataSources.comments.getCommentByPostId(post.id, take, skip);
  }
}
