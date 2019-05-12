import { Resolver, Query, Ctx, Arg } from 'type-graphql';
import { generateToken } from '@crz/jwt-auth';

import { Context } from '../context.interface';

@Resolver()
export class LoginResolver {
  @Query(returns => String!)
  login(
    @Ctx() ctx: Context,
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): string {
    // Mocked authentication
    return generateToken(
      { id: 1, username: 'user name', email: 'user@domain.org', name: 'user', roles: [] },
      ctx.jwt.secret,
      ctx.jwt.options,
    );
  }
}
