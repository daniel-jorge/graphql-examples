import { AxiosInstance } from 'axios';
import { SignOptions } from 'jsonwebtoken';

import { User } from './user/user.entity';

export interface User {
  id: number;
  name: string;
  roles: ['REGULAR' | 'ADMIN'];
}

export interface Context {
  user: Partial<User>;
  jwt: {
    secret: string;
    options: SignOptions;
  };
  fetcher: AxiosInstance;
}
