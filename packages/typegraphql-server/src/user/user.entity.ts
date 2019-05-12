import { Field, registerEnumType, Int, ObjectType } from 'type-graphql';
import { Post } from '../post/post.entity';

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
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  website?: string;

  @Field(type => [Post], { nullable: 'items' })
  posts: Post[];
}

@ObjectType()
export class ConnectedUser extends User {
  @Field(type => [Role], { nullable: 'items' })
  roles: Role[];
}
