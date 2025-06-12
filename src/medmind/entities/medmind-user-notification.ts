import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class MedmindUserNotification {
  @Field()
  _id: string

  @Field(() => [String], { description: "The users targeted by the notification" })
  userIds: string[]

  @Field({ description: "The body of the notification message" })
  content: string

  @Field({ description: "The date on which to send the notification" })
  sendAt: string
}

@ObjectType()
export class MedmindUserNotificationList {
  @Field(() => Int)
  totalCount: number

  @Field(() => [MedmindUserNotification])
  data: MedmindUserNotification[]
}