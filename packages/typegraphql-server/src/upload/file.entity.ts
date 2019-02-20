import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class File {
  @Field(() => ID)
  id: number;

  @Field()
  path: string;

  @Field()
  filename: string;

  @Field()
  mimetype: string;
}
