import 'reflect-metadata';
// import queryComplexity, {
//   simpleEstimator,
//   fieldConfigEstimator,
// } from 'graphql-query-complexity';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';
import * as TypeGraphQL from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
// import debug from 'debug';
import express from 'express';

import { useJwtStrategy, jwtAuthenticateMiddleware } from '@crz/jwt-auth';

import { authChecker } from './auth-checker';
import { Context } from './context.interface';
import { jwtConf } from './jwt.conf';
import { MovieDatasource } from './movie/movie.datasource';
import { PersonDatasource } from './person/person.datasource';
// import { ValidationContext } from 'graphql';

// GraphQL
const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || '/graphql';
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
// Voyager
const ENABLE_VOYAGER = process.env.ENABLE_VOYAGER === 'true';
const VOYAGER_ENDPOINT = process.env.VOYAGER_ENDPOINT || '/voyager';

async function bootstrap(): Promise<void> {
  // const debugQueryComplexity = debug('app:gql:query-complexity');

  try {
    const app = express();

    // Setup Jwt Passport Strategy
    useJwtStrategy(jwtConf);

    // build TypeGraphQL executable schema
    const schema = await TypeGraphQL.buildSchema({
      resolvers: [
        `${__dirname}/**/**.resolver.ts`,
        `${__dirname}/**/**.resolver.js`,
      ],
      authChecker,
    });

    const server = new ApolloServer({
      schema,
      dataSources: () => ({
        movies: new MovieDatasource(process.env.REST_SERVER),
        people: new PersonDatasource(process.env.REST_SERVER),
      }),
      context: ({ req, res }): Context => {
        return {
          jwt: {
            secret: jwtConf.secret,
            options: jwtConf.options,
          },
          user: (req as any).user,
        };
      },
      playground: true,
      debug: process.env.NODE_ENV !== 'production',
      // validationRules: [
      //   /**
      //    * This provides GraphQL query analysis to reject complex queries to your GraphQL server.
      //    * This can be used to protect your GraphQL servers
      //    * against resource exhaustion and DoS attacks.
      //    * More documentation can be found (here)[https://github.com/ivome/graphql-query-complexity]
      //    */
      //   // console.log(req.body.variables);
      //   (context: ValidationContext) =>
      //     queryComplexity({
      //       // The maximum allowed query complexity, queries above this threshold will be rejected
      //       maximumComplexity: 20,
      //       // The query variables. This is needed because the variables are not available
      //       // in the visitor of the graphql-js library
      //       variables: req.body.variables,
      //       // Optional callback function to retrieve the determined query complexity
      //       // Will be invoked weather the query is rejected or not
      //       // This can be used for logging or to implement rate limiting
      //       onComplete: (complexity: number) => {
      //         debugQueryComplexity('Query Complexity:', complexity);
      //       },
      //       // Add any number of estimators. The estimators are invoked in order, the first
      //       // numeric value that is being returned by an estimator is used as the field complexity.
      //       // If no estimator returns a value, an exception is raised.
      //       estimators: [
      //         fieldConfigEstimator(),
      //         // Add more estimators here...
      //         // This will assign each field a complexity of 1 if no other estimator
      //         // returned a value.
      //         simpleEstimator({
      //           defaultComplexity: 1,
      //         }),
      //       ],
      //     }),
      // ] as any,
    });

    // Express middlewares
    app.use(jwtAuthenticateMiddleware());
    if (ENABLE_VOYAGER) {
      app.use(
        VOYAGER_ENDPOINT,
        voyagerMiddleware({ endpointUrl: GRAPHQL_ENDPOINT }),
      );
    }

    // Apollo server as middlware
    server.applyMiddleware({
      app,
      path: GRAPHQL_ENDPOINT,
      cors: {
        credentials: true,
        origin: '*',
      },
    });

    // Start server
    app.listen(
      {
        port: PORT,
      },
      () =>
        console.info(
          `🚀 Server is running, GraphQL Playground available at http://localhost:${PORT}${GRAPHQL_ENDPOINT}`,
        ),
    );
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
