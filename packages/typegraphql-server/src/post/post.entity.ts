import { Field, Int, ObjectType } from 'type-graphql';
import { User } from '../user/user.entity';
import { Comment } from '../comment/comment.entity';

@ObjectType()
export class Post {
  @Field(type => Int)
  id: number;

  @Field(type => Int)
  userId: number;

  @Field(type => User)
  user: User;

  @Field()
  title: string;

  @Field()
  body: string;

  @Field(type => [Comment], { nullable: 'items' })
  comments: Comment[];
}
