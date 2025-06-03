import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { HttpService } from 'src/http/http.service'
import { MedmindUserNotificationInput } from './dto/medmind-user-notification.input'
import { MedmindUserNotification, MedmindUserNotificationList } from './entities/medmind-user-notification'
import { UserPayload } from 'src/auth/auth.service'
import { DecodeJWT } from 'src/helpers/jwtDecode'

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
    tenantId: string,
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
      tenantId,
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
}
