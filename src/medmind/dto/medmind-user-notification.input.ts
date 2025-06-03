import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class MedmindUserNotificationInput {
  @Field()
  tenantId: string

  @Field({ description: "The user targeted by the notification" })
  userId: string

  @Field({ description: "The body of the notification message" })
  content: string

  @Field({ nullable: true, description: "Omit to send notification immediately" })
  sendAt: string
}