import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserTagUpdateInput {
  @Field()
  label: string

  @Field()
  color: string
}

@InputType()
export class UserUpdateInput {
  @Field(() => [UserTagUpdateInput])
  tags: UserTagUpdateInput[]
}

@InputType()
export class UserBulkUpdateInput {
  @Field()
  userId: string

  @Field()
  update: UserUpdateInput
}