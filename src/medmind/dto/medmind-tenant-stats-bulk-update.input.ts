import { Field, InputType } from '@nestjs/graphql'
import { MedmindSubscriptionInput } from './medmind-tenant-stats.input'

@InputType()
export class MedmindTenantStatsBulkUpdateInput {
  @Field({
    nullable: true,
    description: "The amount of credit to add to each tenant"
  })
  balanceIncrement: number

  @Field({
    nullable: true,
    description: "The new subscription for each tenant"
  })
  subscription: MedmindSubscriptionInput
}