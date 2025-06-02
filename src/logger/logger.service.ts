import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPayload } from 'src/auth/auth.service';
import { DecodeJWT } from 'src/helpers/jwtDecode';
import { GraphQLRequestMetadata, GraphQLRequestResponse } from 'src/schemas/graphql-request-response.schema';

@Injectable()
export class LoggerService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(GraphQLRequestResponse.name)
    private readonly requestResponseModel: Model<GraphQLRequestResponse>
  ) {}

  async logGraphQLRequestResponse(
    operationName: string,
    args: any,
    duration: number,
    response: string,
    ipAddress: string
  ) {
    let metadata: GraphQLRequestMetadata = {
      tenantId: args.tenantId || args.organizationId,
      userId: null,
      ip: ipAddress
    };
    const token = args.token || args.authToken;

    if (token) {
      try {
        const decodedToken: UserPayload = DecodeJWT(
          token,
          this.configService.get("JWT_SECRET"),
        ) as UserPayload;

        metadata.tenantId = decodedToken.tenant;
        metadata.userId = decodedToken.id;
      } catch (_error) {}
    }

    const requestResponseDto = { operationName, args, duration, response, metadata };
    const result = await this.requestResponseModel.create(requestResponseDto);
    return result;
  }
}
