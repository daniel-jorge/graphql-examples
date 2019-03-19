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
  person(
    @Ctx() { dataSources }: Context,
    @Arg('id', type => Int) id: number,
  ): Promise<Person | null> {
    return dataSources.people.getPerson(id);
  }
}
