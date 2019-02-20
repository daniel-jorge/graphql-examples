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
    @Ctx() ctx: Context,
    @Arg('id', type => Int) id: number,
  ): Promise<Movie> {
    const response = await ctx.fetcher.get<Movie>(`/movies/${id}`);
    return response.data;
  }

  @Authorized()
  @Query(returns => [Movie])
  async movies(@Ctx() ctx: Context): Promise<Movie[]> {
    const response = await ctx.fetcher.get<Movie[]>(`/movies`);
    return response.data;
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
    @Ctx() ctx: Context,
    @Root() movie: Movie,
  ): Promise<Person[]> {
    const response = await ctx.fetcher.get<any[]>(
      `/movies/${movie.id}/directors?_expand=persons`,
    );
    return response.data.map(item => item.persons);
  }

  @FieldResolver(type => [Person], { nullable: 'items' })
  async actors(@Ctx() ctx: Context, @Root() movie: Movie): Promise<Person[]> {
    const response = await ctx.fetcher.get<any[]>(
      `/movies/${movie.id}/actors?_expand=persons`,
    );
    return response.data.map(item => item.persons);
  }
}
