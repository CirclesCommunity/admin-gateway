import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class MedmindUserSpecialitySchema {
  @Field()
  name: string

  @Field(() => [String])
  subspecialities: string[]
}

@ObjectType()
export class MedmindUsageReportEntry {
  @Field({ description: "Date in yyyy-mm-dd format" })
  date: string

  @Field({ description: "Number of entries in the given date" })
  count: number
}

@ObjectType()
export class MedmindUsageReportUserTag {
  @Field()
  label: string

  @Field()
  color: string
}

@ObjectType()
export class MedmindUserEducation {
  @Field({ nullable: true })
  level: string

  @Field({ nullable: true })
  sublevel: string
}

@ObjectType()
export class MedmindUsageReportItem {
  @Field({ description: "Full name of the user in English" })
  name: string

  @Field({ description: "The user's email" })
  email: string

  @Field({ nullable: true, description: "The user's primary phone number" })
  primaryPhone: string

  @Field({ nullable: true, description: "The user's alternate phone number" })
  secondaryPhone: string

  @Field(() => [MedmindUserSpecialitySchema])
  specialities: MedmindUserSpecialitySchema[]

  @Field(() => MedmindUserEducation, { nullable: true })
  education: MedmindUserEducation

  @Field(() => [MedmindUsageReportEntry])
  entries: MedmindUsageReportEntry[]

  @Field(() => Int, { description: "The total number of entries for the user" })
  totalEntries: number

  @Field(() => Int, { description: "The user's current balance" })
  balance: number

  @Field(() => [MedmindUsageReportUserTag], { description: "The user's tags", nullable: true })
  tags: MedmindUsageReportUserTag[]

  @Field({
    nullable: true,
    description: "The last date on which a notification was sent to the user (null if no notification was ever sent)"
  })
  lastNotificationDate: string
  
  @Field()
  tenantId: string

  @Field()
  userId: string
  
  @Field({ description: "The date on which the user has registered (in ISO format with UTC offset)" })
  registeredAt: string
}

@ObjectType()
export class MedmindUsageReport {
  @Field(() => Int)
  totalCount: number

  @Field(() => [MedmindUsageReportItem])
  data: MedmindUsageReportItem[]
}