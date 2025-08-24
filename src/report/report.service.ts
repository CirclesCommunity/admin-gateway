import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { UserPayload } from 'src/auth/auth.service'
import { DecodeJWT } from 'src/helpers/jwtDecode'
import { HttpService } from 'src/http/http.service'
import { SuccessResult } from 'src/shared/response'
import { MedmindUsageReport } from './entities/medmind-usage-report'
import { MedmindUsersReport } from './entities/medmind-users-report'

@Injectable()
export class ReportService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async generateMedmindUsageReport(
    token: string,
    tenantIds: string[]
  ): Promise<SuccessResult> {
    const decodedToken: UserPayload = DecodeJWT(
      token,
      this.configService.get("JWT_SECRET")
    ) as UserPayload

    const payload = {}
    if (tenantIds?.length > 0) payload["tenantIds"] = tenantIds

    const result = await this.httpService.PostHttpRequest(
      this.configService.get("CHATBOT"),
      "/report/usage",
      payload
    ) as SuccessResult

    return result
  }

  async getMedmindUsageReport(
    token: string,
    pageNumber: number,
    pageSize: number
  ): Promise<MedmindUsageReport> {
    const decodedToken: UserPayload = DecodeJWT(
      token,
      this.configService.get("JWT_SECRET")
    ) as UserPayload

    const query = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    })

    const result = await this.httpService.GetHttpRequest(
      this.configService.get("CHATBOT"),
      `/report/usage?${query}`,
    ) as MedmindUsageReport

    return result
  }

  async generateMedmindUsersReport(
    token: string
  ): Promise<SuccessResult> {
    const decodedToken: UserPayload = DecodeJWT(
      token,
      this.configService.get("JWT_SECRET")
    ) as UserPayload

    const result = await this.httpService.PostHttpRequest(
      this.configService.get("CHATBOT"),
      "/report/users",
      {}
    ) as SuccessResult

    return result
  }

  async getMedmindUsersReport(
    token: string,
    pageNumber: number,
    pageSize: number
  ): Promise<MedmindUsersReport> {
    const decodedToken: UserPayload = DecodeJWT(
      token,
      this.configService.get("JWT_SECRET")
    ) as UserPayload

    const query = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    })

    const result = await this.httpService.GetHttpRequest(
      this.configService.get("CHATBOT"),
      `/report/users?${query}`,
    ) as MedmindUsersReport

    return result
  }
}
