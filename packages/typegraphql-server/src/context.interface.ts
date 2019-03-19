import { SignOptions } from 'jsonwebtoken';

import { User } from './user/user.entity';
import { MovieDatasource } from './movie/movie.datasource';
import { PersonDatasource } from './person/person.datasource';

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
  dataSources?: {
    movies: MovieDatasource;
    people: PersonDatasource;
  };
}
