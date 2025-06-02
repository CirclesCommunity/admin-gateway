import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class GraphQLLoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    // Only intercept GraphQL requests
    if (context.getType<string>() != "graphql") {
      return next.handle();
    }

    const ctx = GqlExecutionContext.create(context);
    const info = ctx.getInfo();
    const operationName = info.path.key;
    const args = ctx.getArgs();
    
    // Get IP address
    const request = ctx.getContext().req
    const ipAddress = request?.headers?.['x-forwarded-for'] || request?.connection?.remoteAddress

    const start = Date.now();

    return next.handle().pipe(
      tap({
        next: async (result) => {
          const duration = Date.now() - start;
          try {
            this.loggerService.logGraphQLRequestResponse(operationName, args, duration, JSON.stringify(result), ipAddress);
          } catch (_error) {}
        },
        error: async (error) => {
          const duration = Date.now() - start;
          try {
            this.loggerService.logGraphQLRequestResponse(operationName, args, duration, JSON.stringify(error), ipAddress);
          } catch (_error) {}
      },
      })
    );
  }
}