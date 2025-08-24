import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReportService } from './report.service'
import { SuccessResult } from 'src/shared/response'
import { MedmindUsageReport } from './entities/medmind-usage-report'
import { MedmindUsersReport } from './entities/medmind-users-report'

@Resolver()
export class ReportResolver {
  constructor(
    private reportService: ReportService,
  ) {}
  
  @Mutation(() => SuccessResult)
  async generateMedmindUsageReport(
    @Args("token") token: string,
    @Args("tenantIds", { type: () => [String], nullable: true }) tenantIds: string[]
  ): Promise<SuccessResult> {
    return await this.reportService.generateMedmindUsageReport(token, tenantIds)
  }

  @Query(() => MedmindUsageReport)
  async getMedmindUsageReport(
    @Args("token") token: string,
    @Args("pageNumber", { type: () => Int }) pageNumber: number,
    @Args("pageSize", { type: () => Int }) pageSize: number
  ): Promise<MedmindUsageReport> {
    return await this.reportService.getMedmindUsageReport(token, pageNumber, pageSize)
  }

  @Mutation(() => SuccessResult)
  async generateMedmindUsersReport(
    @Args("token") token: string
  ): Promise<SuccessResult> {
  return await this.reportService.generateMedmindUsersReport(token)    
  }

  @Query(() => MedmindUsersReport)
  async getMedmindUsersReport(
    @Args("token") token: string,
    @Args("pageNumber", { type: () => Int }) pageNumber: number,
    @Args("pageSize", { type: () => Int }) pageSize: number
  ): Promise<MedmindUsersReport> {
  return await this.reportService.getMedmindUsersReport(token, pageNumber, pageSize)    
  }
}
