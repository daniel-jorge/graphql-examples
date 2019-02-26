# GraphQL examples

## Type-GraphQL gateway

Simple graphql gateway that uses [Type-GraphQL](https://19majkel94.github.io/type-graphql)

```sh
yarn install
lerna run build
yarn start:type-graphql
```

## Style conventions (from [Apollo doc](https://www.apollographql.com/docs/apollo-server/essentials/schema.html#style))

The GraphQL specification is flexible and doesn’t impose specific naming guidelines. However, in order to facilitate development and continuity across GraphQL deployments, it’s useful to have a general set of conventions. We suggest the following:

- Fields should be named in camelCase, since the majority of consumers will be client applications written in JavaScript, Java, Kotlin, or Swift, all of which recommend camelCase for variable names.
- Types: should be PascalCase, to match how classes are defined in the languages above.
- Enums: should have their type name in PascalCase, and their value names in ALL_CAPS, since they are similar to constants.

If you use the conventions above, you won’t need to have any extra logic in your clients to convert names to match the conventions of these languages.
