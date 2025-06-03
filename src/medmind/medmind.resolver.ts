import { Args, Int, Mutation, Resolver, Query } from '@nestjs/graphql';
import { MedmindService } from './medmind.service'
import { MedmindUserNotificationInput } from './dto/medmind-user-notification.input'
import { MedmindUserNotification, MedmindUserNotificationList } from './entities/medmind-user-notification'

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
    @Args("tenantId") tenantId: string,
    @Args("userId") userId: string,
    @Args("startDate", { nullable: true }) startDate: string,
    @Args("endDate", { nullable: true }) endDate: string,
    @Args("pageNumber", { type: () => Int }) pageNumber: number,
    @Args("pageSize", { type: () => Int }) pageSize: number
  ): Promise<MedmindUserNotificationList> {
    return await this.medmindService.getMedmindUserNotifications(
      token, tenantId, userId, startDate, endDate, pageNumber, pageSize
    )
  }
}
