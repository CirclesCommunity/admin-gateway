import { registerEnumType } from "@nestjs/graphql";

export enum MobilePackageBillingPeriod {
  MONTHLY = "MONTHLY",
  ANNUALLY = "ANNUALLY"
}

registerEnumType(MobilePackageBillingPeriod, { name: "MobilePackageBillingPeriod" })