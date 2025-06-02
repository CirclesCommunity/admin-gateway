import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { readFileSync } from 'fs';
import helmet from 'helmet';
import { SentryFilter } from './sentry.filter';

let key = '';
let cert = '';
try {
  key = readFileSync('./secrets/key.pem', 'utf-8')
  cert = readFileSync('./secrets/server.crt', 'utf-8')
} catch (_error) {}

async function bootstrap() {
  // Sentry.init({

  // })

  let app: INestApplication<any>;
  if (key && cert) {
    app = await NestFactory.create(AppModule, {
      rawBody: true,
      httpsOptions: { key, cert }
    });
  } else {
    app = await NestFactory.create(AppModule, {
      rawBody: true
    });
  }
  app.enableCors({
    origin: '*'
  });
  
  // app.useGlobalPipes(new ValidationPipe({
  //   transform: true,
  //   stopAtFirstError: true
  // }));

  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com', 'cdn.jsdelivr.net'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
        frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
      },
    },
  }
  ));
  
  const configService = app.get(ConfigService);

  Sentry.init({
    dsn: configService.get("SENTRY_DSN")
  })

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new SentryFilter(httpAdapter));

  const port = configService.get<number>('PORT');
  Logger.log(`Server is running at: http://localhost:${port}`, 'App');
  await app.listen(port, '0.0.0.0');
}
bootstrap();
