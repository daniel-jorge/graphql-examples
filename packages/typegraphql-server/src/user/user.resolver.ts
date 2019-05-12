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
import { User, ConnectedUser } from './user.entity';
import { Context } from '../context.interface';
import { Post } from '../post/post.entity';
import { GetPaginationArgs } from '../shared/first.args';

@Resolver(of => User)
export class UserResolver {
  @Authorized()
  @Query(returns => User, { nullable: true })
  me(@Ctx() ctx: Context): Partial<ConnectedUser> {
    return ctx.user;
  }

  @Authorized()
  @Query(returns => [User], { nullable: 'items' })
  users(@Ctx() ctx: Context, @Args() { skip, take }: GetPaginationArgs): Promise<User[]> {
    return ctx.dataSources.users.getUsers(skip, take);
  }

  @Authorized()
  @Query(returns => User, { nullable: true })
  user(@Ctx() ctx: Context, @Arg('id', type => Int) id: number): Promise<User> {
    return ctx.dataSources.users.getUser(id);
  }

  @Authorized()
  @FieldResolver()
  posts(
    @Ctx() ctx: Context,
    @Root() user: User,
    @Args() { skip, take }: GetPaginationArgs,
  ): Promise<Post[]> {
    return ctx.dataSources.posts.getPostsByUserId(user.id, take, skip);
  }
}
