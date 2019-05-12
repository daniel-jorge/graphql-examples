import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class {{entityClass}} {
  @Field(type => Int)
  id: number;
}
