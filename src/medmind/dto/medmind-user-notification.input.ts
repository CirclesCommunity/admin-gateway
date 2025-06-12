import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class MedmindUserNotificationInput {
  @Field()
  tenantId: string
  
  @Field(() => [String], { description: "The users targeted by the notification" })
  userIds: string[]

  @Field({ description: "The body of the notification message" })
  content: string

  @Field({ nullable: true, description: "Omit to send notification immediately" })
  sendAt: string
}