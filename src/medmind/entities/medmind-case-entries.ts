import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class MedmindCaseEntryMetadata {
  @Field({ nullable: true })
  apiResponseTime: number
}

@ObjectType()
export class MedmindCaseEntry {
  @Field()
  template: string

  @Field({ nullable: true })
  creditUsage: number

  @Field()
  createdAt: string

  @Field({ nullable: true })
  metadata: MedmindCaseEntryMetadata
}

@ObjectType()
export class MedmindCaseEntries {
  @Field(() => [MedmindCaseEntry])
  data: MedmindCaseEntry[]

  @Field(() => Int)
  totalCount: number
}