import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLRequestResponse, GraphQLRequestResponseSchema } from 'src/schemas/graphql-request-response.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GraphQLRequestResponse.name, schema: GraphQLRequestResponseSchema }]),
  ],
  providers: [LoggerService],
  exports: [LoggerService]
})
export class LoggerModule {}
