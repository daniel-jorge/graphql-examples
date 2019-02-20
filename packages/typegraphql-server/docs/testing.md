# Testing GraphQL server

## Integration testing

Integration tests are the same as with any other graphql framework: execute a query against the build schema.

```typescript
// Build schema
const schema = await TypeGraphQL.buildSchema({
  resolvers: [CharacterResolver],
});

// Execute a query
const query = `
  query findOne($id: Int!) {
    character(id: $id) {
      id
      firstName
    }
  }
`;
const result = await graphql(schema, query, null, null, { id: 0 });

// Make the expectation
expect(result.data).toEqual({
  character: { id: '0', firstName: 'it works!' },
});
```

## Mocking context

Just pass mocked objects/values when executing query.

```typescript
const result = await graphql(schema, query, null, {
  fetcher: new MockFetcher(),
  user: new MockUser(),
  ...
}, { id: 0 });
```
