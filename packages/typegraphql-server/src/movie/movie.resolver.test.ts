import 'reflect-metadata';

import { MovieResolver } from './movie.resolver';
import { GraphQLCallBuilder } from '../test-utils/graphql-call.builder';

const fixtures = {
  movies: [
    {
      id: 0,
      title: 'movie 0 title',
    },
    {
      id: 1,
      title: 'movie 1 title',
    },
  ],
};

describe('Movie resolver', () => {
  describe('when i call movie with an id', () => {
    it('should return matching movie', async () => {
      const query = `
        query movie($id: Int!) {
          movie(id: $id) {
            id
            title
          }
        }
      `;
      const result = await new GraphQLCallBuilder()
        .withResolvers([MovieResolver])
        .withUser({})
        .withContext({
          fetcher: {
            get: (uri: string) =>
              Promise.resolve({
                data: fixtures.movies[0],
              }),
          },
        })
        .exec(query, { id: 0 });
      expect(result.data).toEqual({
        movie: fixtures.movies[0],
      });
    });
  });
});
