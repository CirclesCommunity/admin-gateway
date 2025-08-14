import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class MedmindUserSubscription {
  @Field()
  packageName: string

  @Field()
  startDate: string

  @Field()
  expiryDate: string
}

@ObjectType()
export class MedmindUserSpeciality {
  @Field()
  specialityId: string

  @Field(() => [String])
  subspecialities: string[]
}

@ObjectType()
export class MedmindUsersReportUserTag {
  @Field()
  label: string

  @Field()
  color: string
}

@ObjectType()
export class MedmindUsersReportItem {
  @Field()
  name: string

  @Field()
  email: string

  @Field(() => [MedmindUserSpeciality])
  specialities: MedmindUserSpeciality[]

  @Field()
  registeredAt: string

  @Field(() => MedmindUserSubscription)
  subscription: MedmindUserSubscription

  @Field(() => [MedmindUsersReportUserTag])
  tags: MedmindUsersReportUserTag[]

  @Field()
  tenantId: string

  @Field()
  userId: string
}

@ObjectType()
export class MedmindUsersReport {
  @Field(() => Int)
  totalCount: number

  @Field(() => [MedmindUsersReportItem])
  data: MedmindUsersReportItem[]
}