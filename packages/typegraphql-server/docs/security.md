# Security

## Query complexity DoS attack (aka unbounded queries)

Let's say we have a schema with a circular relationship:

```graphql
type Movie {
  id Int!
  title String!
  actors(first: Int!, after: Int!) [Actors]!
}

type Actor {
  id Int!
  name String!
  movies(first: Int!, after: Int!) [Movie]!
}

type query movie(id: Int!): Movie
```

You can do a DoS by sending expensive and nested queries to the server.

```graphql
query attack {
  movie(id: 1) {
    actors(first: 99999) {
      movies(first: 99999) {
        actors(first: 99999) {
          movies(first: 99999) {
            # and so on...
          }
        }
      }
    }
  }
}
```

Fortunately that kind of attack can be mitigated/avoided by:

- Limiting the query depth
- Limiting the number of returned items
- Limiting the query complexity

### Limiting the query depth

You can limit query depth by using the [graphql-depth-limit](https://github.com/stems/graphql-depth-limit) validator.

First, evaluate the max authorized query depth limit (let's say 5). Then add the depthLimit validation rules of your graphql server:

```javascript
import depthLimit from 'graphql-depth-limit';

app.use(
  '/graphql',
  graphqlHTTP((req, res) => ({
    schema,
    validationRules: [depthLimit(5)],
  })),
);
```

### Limiting the number of returned items

Create a scalar Int argument that restrict the maximum value for the amount of returned items:

```javascript
const MaxItemAmount = GraphQLInputInt({
  name: 'MaxItemAmount',
  min: 1,
  max: 100,
});
```

Use it in the schema:

```graphql
type Movie {
  id Int!
  title String!
  actors(first: MaxItemAmount!, after: Int) [Actors]!
}

type Actor {
  id Int!
  name String!
  movies(first: MaxItemAmount!, after: Int!) [Movie]!
}

type query movie(id: Int!): Movie
```

### Limiting the query complexity

Don't use this technique if you don't need because computing a maximum query complexity can be very tricky.

&lt;TODO&gt;

Use [graphql-query-complexity](https://github.com/slicknode/graphql-query-complexity) validation rule.

Sources:
https://blog.apollographql.com/securing-your-graphql-api-from-malicious-queries-16130a324a6b
