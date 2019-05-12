import { Resolver, Query, Authorized, Ctx, Arg, Int } from 'type-graphql';
import { {{entityClass}} } from './{{entity}}.entity';
import { Context } from '../context.interface';

@Resolver(of => {{entityClass}})
export class {{entityClass}}Resolver {

  @Authorized()
  @Query(returns => [{{entityClass}}], { nullable: 'items' })
  {{entityInstance}}s(@Ctx() ctx: Context): Promise<{{entityClass}}[]> {
    return ctx.dataSources.{{entityInstance}}s.get{{entityClass}}s();
  }

  @Authorized()
  @Query(returns => {{entityClass}}, { nullable: true })
  {{entityInstance}}(@Ctx() ctx: Context, @Arg('id', type => Int) id: number): Promise<{{entityClass}}> {
    return ctx.dataSources.{{entityInstance}}s.get{{entityClass}}(id);
  }
}
