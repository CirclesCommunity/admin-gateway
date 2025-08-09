import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class MedmindPackageNameLocaleInput {
  @Field()
  lang: string

  @Field()
  value: string
}

@InputType()
export class MedmindPackageFeatureInput {
  @Field()
  code: string

  @Field()
  included: true
}

@InputType()
export class MedmindSubscriptionInput {
  @Field()
  packageId: string

  @Field(() => [MedmindPackageNameLocaleInput])
  packageName: MedmindPackageNameLocaleInput[]

  @Field(() => [MedmindPackageFeatureInput], { nullable: true })
  features: MedmindPackageFeatureInput[]

  @Field()
  startDate: string

  @Field()
  expiryDate: string

  @Field()
  active: boolean

  @Field({ nullable: true })
  resellerId: string
}

@InputType()
export class MedmindResellerPackageInput {
  @Field({ nullable: true })
  _id: string

  @Field()
  packageId: string

  @Field(() => [MedmindPackageNameLocaleInput])
  packageName: MedmindPackageNameLocaleInput[]

  @Field({ nullable: true })
  assignedTo: string

  @Field()
  startDate: string

  @Field()
  expiryDate: string

  @Field()
  balance: number
}

@InputType()
export class MedmindTenantStatsInput {
  @Field()
  balance: number

  @Field()
  cases: number

  @Field(() => MedmindSubscriptionInput)
  subscription: MedmindSubscriptionInput

  @Field(() => [MedmindResellerPackageInput], { nullable: true })
  resellerPackages: MedmindResellerPackageInput[]
}