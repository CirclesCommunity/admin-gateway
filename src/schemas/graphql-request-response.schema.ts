import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";

@Schema({ _id: false })
export class GraphQLRequestMetadata {
  @Prop()
  tenantId: string;

  @Prop()
  userId: string;

  @Prop()
  ip: string;
}

@Schema({ timestamps: true, collection: "graphqlrequestlog" })
export class GraphQLRequestResponse {
  @Prop()
  operationName: string;

  @Prop({ type: SchemaTypes.Mixed })
  args: any;

  @Prop()
  duration: number;

  @Prop()
  response: string;

  @Prop({ type: GraphQLRequestMetadata })
  metadata: GraphQLRequestMetadata;
}

export const GraphQLRequestResponseSchema = SchemaFactory.createForClass(GraphQLRequestResponse);