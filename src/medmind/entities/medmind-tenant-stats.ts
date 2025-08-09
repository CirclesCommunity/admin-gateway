import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class MedmindPackageNameLocale {
  @Field()
  lang: string

  @Field()
  value: string
}

@ObjectType()
export class MedmindPackageFeature {
  @Field()
  code: string

  @Field()
  included: true
}

@ObjectType()
export class MedmindSubscription {
  @Field()
  packageId: string

  @Field(() => [MedmindPackageNameLocale])
  packageName: MedmindPackageNameLocale[]

  @Field(() => [MedmindPackageFeature], { nullable: true })
  features: MedmindPackageFeature[]

  @Field()
  startDate: string

  @Field()
  expiryDate: string

  @Field()
  active: boolean

  @Field({ nullable: true })
  resellerId: string
}

@ObjectType()
export class MedmindResellerPackage {
  @Field()
  _id: string

  @Field()
  packageId: string

  @Field(() => [MedmindPackageNameLocale])
  packageName: MedmindPackageNameLocale[]

  @Field({ nullable: true })
  assignedTo: string

  @Field()
  startDate: string

  @Field()
  expiryDate: string

  @Field()
  balance: number
}

@ObjectType()
export class MedmindTenantStats {
  @Field()
  balance: number

  @Field()
  cases: number

  @Field()
  approxCasesLeft: number

  @Field(() => MedmindSubscription)
  subscription: MedmindSubscription

  @Field(() => [MedmindResellerPackage], { nullable: true })
  resellerPackages: MedmindResellerPackage[]
}