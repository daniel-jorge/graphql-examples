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

import { Movie } from './movie.entity';
import { MovieInput } from './movie.input';
import { Context } from '../context.interface';
import { Person } from '../person/person.entity';

@Resolver(of => Movie)
export class MovieResolver {
  @Authorized()
  @Query(returns => Movie, { nullable: true })
  async movie(
    @Ctx() { dataSources }: Context,
    @Arg('id', type => Int) id: number,
  ): Promise<Movie | null> {
    return dataSources.movies.getMovie(id);
  }

  @Authorized()
  @Query(returns => [Movie])
  async movies(@Ctx() { dataSources }: Context): Promise<Movie[]> {
    return dataSources.movies.getMovies();
  }

  @Authorized('ADMIN')
  @Mutation(returns => Movie)
  async addMovie(@Arg('show') showInput: MovieInput): Promise<Movie> {
    return Promise.resolve(null);
  }

  @Authorized('ADMIN')
  @Mutation(returns => Boolean)
  async deleteMovie(@Arg('id', type => Int) id: number): Promise<boolean> {
    return false;
  }

  @FieldResolver(type => [Person], { nullable: 'items' })
  async directors(
    @Ctx() { dataSources }: Context,
    @Root() { id }: Movie,
  ): Promise<Person[]> {
    return dataSources.movies.getMovieDirectors(id);
  }

  @FieldResolver(type => [Person], { nullable: 'items' })
  actors(
    @Ctx() { dataSources }: Context,
    @Root() { id }: Movie,
  ): Promise<Person[]> {
    return dataSources.movies.getMovieActors(id);
  }
}
