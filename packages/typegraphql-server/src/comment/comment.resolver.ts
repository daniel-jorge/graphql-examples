import { Resolver, Query, Authorized, Ctx, Arg, Int, FieldResolver, Root } from 'type-graphql';
import { Comment } from './comment.entity';
import { Context } from '../context.interface';
import { Post } from '../post/post.entity';

@Resolver(of => Comment)
export class CommentResolver {
  @Authorized()
  @Query(returns => [Comment], { nullable: 'items' })
  comments(@Ctx() ctx: Context): Promise<Comment[]> {
    return ctx.dataSources.comments.getComments();
  }

  @Authorized()
  @Query(returns => Comment, { nullable: true })
  comment(@Ctx() ctx: Context, @Arg('id', type => Int) id: number): Promise<Comment> {
    return ctx.dataSources.comments.getComment(id);
  }

  @Authorized()
  @FieldResolver()
  post(@Ctx() ctx: Context, @Root() comment: Comment): Promise<Post> {
    return ctx.dataSources.posts.getPost(comment.postId);
  }
}
