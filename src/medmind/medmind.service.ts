import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpService } from 'src/http/http.service'
import { MedmindUserNotificationInput } from './dto/medmind-user-notification.input'
import { MedmindUserNotification, MedmindUserNotificationList } from './entities/medmind-user-notification'
import { UserPayload } from 'src/auth/auth.service'
import { DecodeJWT } from 'src/helpers/jwtDecode'
import { MedmindTenantStats } from './entities/medmind-tenant-stats'
import { MedmindTenantStatsInput } from './dto/medmind-tenant-stats.input'
import { MedmindPackages } from './entities/medmind-packages'
import { SuccessResult } from 'src/shared/response'
import { MedmindTenantStatsBulkUpdateInput } from './dto/medmind-tenant-stats-bulk-update.input'

@Injectable()
export class MedmindService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async sendMedmindUserNotification(
    token: string,
    notification: MedmindUserNotificationInput
  ): Promise<MedmindUserNotification> {
    const decodedToken: UserPayload = DecodeJWT(
      token,
      this.configService.get("JWT_SECRET")
    ) as UserPayload
    
    const result = await this.httpService.PostHttpRequest(
      this.configService.get("CHATBOT"),
      "/user-notification",
      notification
    ) as MedmindUserNotification

    return result
  }

  async getMedmindUserNotifications(
    token: string,
    userId: string,
    startDate: string,
    endDate: string,
    pageNumber: number,
    pageSize: number
  ): Promise<MedmindUserNotificationList> {
    const decodedToken: UserPayload = DecodeJWT(
      token,
      this.configService.get("JWT_SECRET")
    ) as UserPayload

    const query = new URLSearchParams({
      userId,
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString() 
    })

    if (startDate) query.set("startDate", startDate)
    if (endDate) query.set("endDate", endDate)
    
    const result = await this.httpService.GetHttpRequest(
      this.configService.get("CHATBOT"),
      `/user-notification?${query}`
    ) as MedmindUserNotificationList

    return result
  }

  async updateMedmindTenantStats(
    token: string,
    tenantId: string,
    tenantStats: MedmindTenantStatsInput
  ): Promise<MedmindTenantStats> {
    const decodedToken: UserPayload = DecodeJWT(
      token,
      this.configService.get("JWT_SECRET")
    ) as UserPayload

    const query = new URLSearchParams({ tenantId })

    const result = await this.httpService.PutHttpRequest(
      this.configService.get("CHATBOT"),
      `/tenant-stats`,
      { tenantId, tenantStats }
    ) as MedmindTenantStats

    return result
  }

  async bulkUpdateMedmindTenantStats(
    token: string,
    tenantIds: string[],
    updates: MedmindTenantStatsBulkUpdateInput
  ): Promise<SuccessResult> {
    try {
      const decodedToken: UserPayload = DecodeJWT(
        token,
        this.configService.get('JWT_SECRET'),
      ) as UserPayload

      const result = await this.httpService.PostHttpRequest(
        this.configService.get('CHATBOT'),
        "/tenant-stats/balance",
        { tenantIds, updates }
      ) as unknown as SuccessResult

      return result
    } catch (error) {
      Logger.log(error)
      throw error
    }
  }

  async getMedmindTenantStats(token: string, tenantId?: string): Promise<MedmindTenantStats> {
    try {
      const decodedToken: UserPayload = DecodeJWT(
        token,
        this.configService.get('JWT_SECRET'),
      ) as UserPayload

      const effectiveTenantId = decodedToken.tenant || tenantId

      const query = new URLSearchParams({ tenantId: effectiveTenantId })
      
      const result = await this.httpService.GetHttpRequest(
        this.configService.get("CHATBOT"),
        `/tenant-stats?${query}`
      ) as unknown as MedmindTenantStats

      return result
    } catch (error) {
      throw error
    }
  }

  async findAllMedmindPackages(
    token: string,
    pageNumber: number,
    pageSize: number
  ): Promise<MedmindPackages> {
    try {
      const decodedToken: UserPayload = DecodeJWT(
        token,
        this.configService.get('JWT_SECRET'),
      ) as UserPayload

      const query = new URLSearchParams({
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
      })

      const result = await this.httpService.GetHttpRequest(
        this.configService.get('CHATBOT'),
        `/medmind-package?${query}`
      ) as unknown as MedmindPackages

      return result
    } catch (error) {
      Logger.log(error)
      throw error
    }
  }
}
