
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HttpService } from './http/http.service';
import { LoggerModule } from './logger/logger.module';
import { GraphQLLoggingInterceptor } from './interceptors/graphql-logging.interceptor';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLFormattedError } from 'graphql'
import { ReportModule } from './report/report.module';
import { MedmindModule } from './medmind/medmind.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      subscriptions: {
        "graphql-ws": true,
        "subscriptions-transport-ws": true,
      },
      path: '/graphql',
      playground: true,
      autoSchemaFile: true,
      includeStacktraceInErrorResponses: false,
      formatError: (error) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.message,
          locations: error.locations,
          path: error.path,
          extensions: error.extensions
        };
        return graphQLFormattedError;
      },
    }),
    AuthModule,
    LoggerModule,
    ReportModule,
    MedmindModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    HttpService,
    {
      provide: APP_INTERCEPTOR,
      useClass: GraphQLLoggingInterceptor,
    }
  ],
})
export class AppModule {}
