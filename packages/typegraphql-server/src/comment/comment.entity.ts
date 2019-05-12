import { Field, Int, ObjectType } from 'type-graphql';
import { Post } from '../post/post.entity';

@ObjectType()
export class Comment {
  @Field(type => Int)
  id: number;

  @Field(type => Int)
  postId: number;

  @Field(type => Post)
  post: Post;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  body: string;
}
