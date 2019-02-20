import { Movie } from './movie.entity';
import { InputType, Field } from 'type-graphql';

@InputType()
export class MovieInput implements Partial<Movie> {
  @Field()
  title: string;

  @Field()
  director: string;
}
