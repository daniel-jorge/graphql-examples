import { SignOptions } from 'jsonwebtoken';

import { ConnectedUser } from './user/user.entity';
import { UserDataSource } from './user/user.datasource';
import { CommentDataSource } from './comment/comment.datasource';
import { PostDataSource } from './post/post.datasource';

export interface User {
  id: number;
  name: string;
  roles: ['REGULAR' | 'ADMIN'];
}

export interface Context {
  user: Partial<ConnectedUser>;
  jwt: {
    secret: string;
    options: SignOptions;
  };
  dataSources?: {
    comments: CommentDataSource;
    posts: PostDataSource;
    users: UserDataSource;
  };
  token?: string;
}
