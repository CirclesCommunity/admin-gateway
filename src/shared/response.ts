import { Field, ObjectType } from "@nestjs/graphql";
@ObjectType()
export class SuccessResult {
  @Field()
  success: boolean;
}

@ObjectType()
export class LangValue {
  @Field()
  lang: string;

  @Field()
  value: string;
}