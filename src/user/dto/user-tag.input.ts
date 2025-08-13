import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserTagInput {
  @Field()
  label: string

  @Field()
  color: string
}