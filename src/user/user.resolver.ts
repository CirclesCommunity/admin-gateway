import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service'
import { SuccessResult } from 'src/shared/response'
import { UserBulkUpdateInput } from './dto/user-bulk-update.input'
import { UserTag } from './entities/user-tag'
import { UserTagInput } from './dto/user-tag.input'

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService
  ) {}

  @Mutation(() => SuccessResult)
  async bulkUpdateUsers(
    @Args("token") token: string,
    @Args("updates", { type: () => [UserBulkUpdateInput] }) updates: UserBulkUpdateInput[]
  ): Promise<SuccessResult> {
    return await this.userService.bulkUpdateUsers(token, updates)
  }
  
  @Mutation(() => UserTag)
  async createUserTag(
    @Args("token") token: string,
    @Args("userTag") userTag: UserTagInput
  ): Promise<UserTag> {
    return await this.userService.createUserTag(token, userTag)
  }
  
  @Query(() => [UserTag])
  async findAllUserTags(
    @Args("token") token: string,
    @Args("pageNumber") pageNumber: number,
    @Args("pageSize") pageSize: number
  ): Promise<UserTag[]> {
    return await this.userService.findAllUserTags(token, pageNumber, pageSize)
  }

  @Mutation(() => UserTag)
  async updateUserTag(
    @Args("token") token: string,
    @Args("tagId") tagId: string,
    @Args("userTag") userTag: UserTagInput
  ): Promise<UserTag> {
    return await this.userService.updateUserTag(token, tagId, userTag)
  }
}
