import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Int,
  Authorized,
  Ctx,
  FieldResolver,
  Root,
} from 'type-graphql';

import { Person } from './person.entity';
import { Context } from '../context.interface';

@Resolver(of => Person)
export class PersonResolver {
  @Authorized()
  @Query(returns => Person, { nullable: true })
  async Person(
    @Ctx() ctx: Context,
    @Arg('id', type => Int) id: number,
  ): Promise<Person> {
    const response = await ctx.fetcher.get<Person>(`/actors/${id}`);
    return response.data;
  }
}
