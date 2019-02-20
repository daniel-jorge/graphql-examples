import { graphql } from 'graphql';
import { buildSchema } from 'type-graphql';

import { User } from '../user/user.entity';
import { authChecker } from '../auth-checker';

interface VariableValues {
  [key: string]: any;
}

export class GraphQLCallBuilder {
  private resolvers: (string | Function)[];
  private context: any;
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

  public withRootValue(rootValue: any): GraphQLCallBuilder {
    this.rootValue = rootValue;
    return this;
  }

  public async exec(
    query: string,
    variableValues?: VariableValues,
  ): Promise<any> {
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
    // call
    return await graphql(
      schema,
      query,
      this.rootValue,
      context,
      variableValues,
    );
  }
}
