import { ArgsType, Field, Int } from 'type-graphql';
import { Min, Max } from 'class-validator';

@ArgsType()
export class GetPaginationArgs {
  @Min(0)
  @Field(type => Int, { nullable: true })
  skip?: number;

  @Min(1)
  @Max(10)
  @Field(type => Int, { nullable: true })
  take?: number;
}
