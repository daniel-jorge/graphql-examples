import { Resolver, Query, Authorized, Ctx } from 'type-graphql';
import { User } from './user.entity';
import { Context } from '../context.interface';

@Resolver(of => User)
export class UserResolver {
  @Authorized()
  @Query(returns => User, { nullable: true })
  me(@Ctx() ctx: Context): Partial<User> {
    return ctx.user;
  }
}
