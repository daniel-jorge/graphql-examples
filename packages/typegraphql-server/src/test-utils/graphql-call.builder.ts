import { graphql } from 'graphql';
import { buildSchema } from 'type-graphql';
import { createTestClient } from 'apollo-server-testing';

import { User } from '../user/user.entity';
import { authChecker } from '../auth-checker';
import { RESTDataSource } from 'apollo-datasource-rest';
import { ApolloServer } from 'apollo-server-express';

interface VariableValues {
  [key: string]: any;
}

export class GraphQLCallBuilder {
  private resolvers: (string | Function)[];
  private context: {};
  private dataSources: {
    [key: string]: RESTDataSource;
  };
  private rootValue: any;
  private user: Partial<User>;

  public withResolvers(resolvers: any[]): GraphQLCallBuilder {
    this.resolvers = resolvers;
    return this;
  }

  public withUser(user: Partial<User>): GraphQLCallBuilder {
    this.user = user;
    return this;
  }

  public withContext(context: any): GraphQLCallBuilder {
    this.context = context;
    return this;
  }

  public withDataSource(
    name: string,
    dataSource: RESTDataSource,
  ): GraphQLCallBuilder {
    this.dataSources = { ...this.dataSources, [name]: dataSource };
    return this;
  }

  public withRootValue(rootValue: any): GraphQLCallBuilder {
    this.rootValue = rootValue;
    return this;
  }

  public async build(): Promise<any> {
    // build schema
    const schema = await buildSchema({
      resolvers: this.resolvers,
      authChecker,
    });

    // build context
    const context = {
      ...this.context,
      user: this.user,
    };

    const server = new ApolloServer({
      schema,
      dataSources: () => this.dataSources,
      context,
    });

    return createTestClient(server);
  }
}
