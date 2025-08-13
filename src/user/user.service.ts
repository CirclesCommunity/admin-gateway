import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { HttpService } from 'src/http/http.service'
import { UserBulkUpdateInput } from './dto/user-bulk-update.input'
import { SuccessResult } from 'src/shared/response'
import { UserPayload } from 'src/auth/auth.service'
import { DecodeJWT } from 'src/helpers/jwtDecode'
import { UserTagInput } from './dto/user-tag.input'
import { UserTag } from './entities/user-tag'

@Injectable()
export class UserService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async bulkUpdateUsers(
    token: string,
    updates: UserBulkUpdateInput[]
  ): Promise<SuccessResult> {
    const decodedToken: UserPayload = DecodeJWT(
      token,
      this.configService.get("JWT_SECRET")
    ) as UserPayload
    
    const result = await this.httpService.PutHttpRequest(
      this.configService.get("USERS"),
      "/user/bulk",
      updates
    ) as SuccessResult

    return result
  }

  async createUserTag(
    token: string,
    userTag: UserTagInput
  ): Promise<UserTag> {
    const decodedToken: UserPayload = DecodeJWT(
      token,
      this.configService.get("JWT_SECRET")
    ) as UserPayload
    
    const result = await this.httpService.PostHttpRequest(
      this.configService.get("USERS"),
      "/user-tag",
      userTag
    ) as UserTag

    return result
  }

  async findAllUserTags(
    token: string,
    pageNumber: number,
    pageSize: number
  ): Promise<UserTag[]> {
    const decodedToken: UserPayload = DecodeJWT(
      token,
      this.configService.get("JWT_SECRET")
    ) as UserPayload
    
    const query = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString()
    })

    const result = await this.httpService.GetHttpRequest(
      this.configService.get("USERS"),
      `/user-tag?${query}`,
    ) as UserTag[]

    return result
  }

  async updateUserTag(
    token: string,
    tagId: string,
    userTag: UserTagInput
  ): Promise<UserTag> {
    const decodedToken: UserPayload = DecodeJWT(
      token,
      this.configService.get("JWT_SECRET")
    ) as UserPayload
    
    const result = await this.httpService.PutHttpRequest(
      this.configService.get("USERS"),
      "/user-tag",
      { tagId, userTag }
    ) as UserTag

    return result
  }
}
