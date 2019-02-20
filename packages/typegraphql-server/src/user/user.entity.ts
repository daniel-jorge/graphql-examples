import { ObjectType, Field, registerEnumType } from 'type-graphql';

enum Role {
  REGULAR = 'REGULAR',
  ADMIN = 'ADMIN',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'The possible roles of the user',
});

@ObjectType()
export class User {
  @Field({ nullable: true })
  name?: string;

  @Field()
  email: string;

  @Field(type => [Role], { nullable: 'items' })
  roles: Role[];
}
