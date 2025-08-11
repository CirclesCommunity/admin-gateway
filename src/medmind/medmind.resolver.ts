import { Args, Int, Mutation, Resolver, Query } from '@nestjs/graphql';
import { MedmindService } from './medmind.service'
import { MedmindUserNotificationInput } from './dto/medmind-user-notification.input'
import { MedmindUserNotification, MedmindUserNotificationList } from './entities/medmind-user-notification'
import { MedmindTenantStats } from './entities/medmind-tenant-stats'
import { MedmindTenantStatsInput } from './dto/medmind-tenant-stats.input'

@Resolver()
export class MedmindResolver {
  constructor(
    private medmindService: MedmindService,
  ) {}

  @Mutation(() => MedmindUserNotification)
  async sendMedmindUserNotification(
    @Args("token") token: string,
    @Args("notification") notification: MedmindUserNotificationInput
  ): Promise<MedmindUserNotification> {
    return await this.medmindService.sendMedmindUserNotification(token, notification)
  }

  @Query(() => MedmindUserNotificationList)
  async getMedmindUserNotifications(
    @Args("token") token: string,
    @Args("userId") userId: string,
    @Args("startDate", { nullable: true }) startDate: string,
    @Args("endDate", { nullable: true }) endDate: string,
    @Args("pageNumber", { type: () => Int }) pageNumber: number,
    @Args("pageSize", { type: () => Int }) pageSize: number
  ): Promise<MedmindUserNotificationList> {
    return await this.medmindService.getMedmindUserNotifications(
      token, userId, startDate, endDate, pageNumber, pageSize
    )
  }

  @Mutation(() => MedmindTenantStats)
  async updateMedmindTenantStats(
    @Args("token") token: string,
    @Args("tenantStats") tenantStats: MedmindTenantStatsInput
  ): Promise<MedmindTenantStats> {
    return await this.medmindService.updateMedmindTenantStats(
      token, tenantStats
    )
  }

  @Query(() => MedmindTenantStats)
  async getMedmindTenantStats(
    @Args('token') token: string,
    @Args('tenantId', { nullable: true }) tenantId: string,
  ): Promise<MedmindTenantStats> {
    return await this.medmindService.getMedmindTenantStats(token, tenantId);
  }
}
