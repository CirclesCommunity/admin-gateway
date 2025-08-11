import { Field, ObjectType } from "@nestjs/graphql";
import { MobilePackageBillingPeriod } from "src/shared/enums";
import { LangValue } from "src/shared/response";

@ObjectType()
export class MobilePackageIdentifier {
  @Field()
  android: string

  @Field()
  ios: string
}

@ObjectType()
export class MobilePackage {
  @Field()
  _id: string;
  
  @Field(() => [LangValue])
  name: LangValue[];

  @Field()
  category: string;

  @Field(() => MobilePackageBillingPeriod)
  billingPeriod: MobilePackageBillingPeriod;
}

@ObjectType()
export class MedmindPackages {
  @Field(() => [MobilePackage])
  available: MobilePackage[]
}