import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserTag {
  @Field()
  _id: string

  @Field()
  label: string

  @Field()
  color: string
}