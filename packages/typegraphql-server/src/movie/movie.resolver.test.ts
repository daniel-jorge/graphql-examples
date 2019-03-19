import nock from 'nock';

import { MovieResolver } from './movie.resolver';
import { GraphQLCallBuilder } from '../test-utils/graphql-call.builder';
import { MovieDatasource } from './movie.datasource';

const FIXTURES = {
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
  describe('When i query movie with a valid id', () => {
    let result = null;

    beforeEach(async () => {
      const MOVIE = `
      query movie($id: Int!) {
        movie(id: $id) {
          id
          title
        }
      }
    `;

      nock('http://localhost')
        .get('/movies/0')
        .once()
        .reply(200, FIXTURES.movies[0]);

      const { query } = await new GraphQLCallBuilder()
        .withResolvers([MovieResolver])
        .withUser({})
        .withDataSource('movies', new MovieDatasource('http://localhost'))
        .build();

      result = await query({ query: MOVIE, variables: { id: 0 } });
    });

    test('Then it returns expected data', async () => {
      // No errors
      expect(result.errors).not.toBeDefined();

      // Expected data
      expect(result.data).toEqual({
        movie: FIXTURES.movies[0],
      });
    });
  });
});
