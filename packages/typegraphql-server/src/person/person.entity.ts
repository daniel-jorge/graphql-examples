import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
export class Person {
  @Field(type => Int!)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  bio?: string;
}
