import { Field, ObjectType } from "@nestjs/graphql";
@ObjectType()
export class SuccessResult {
  @Field()
  success: boolean;
}