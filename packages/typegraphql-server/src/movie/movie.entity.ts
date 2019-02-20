import { Field, ObjectType, Int } from 'type-graphql';
import { Person } from '../person/person.entity';

@ObjectType()
export class Movie {
  @Field(type => Int!)
  id: number;

  @Field()
  title: string;

  @Field(type => [Person], { nullable: 'items' })
  directors: Person[];

  @Field(type => [Person], { nullable: 'items' })
  actors: Person[];
}
