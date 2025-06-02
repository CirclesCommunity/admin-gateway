import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from '../../gateway-http/auth.controller';
import { HttpService } from 'src/http/http.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';

function calculateExpirationTime(): number {
  const now = new Date();
  const oneMonthLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // One month in milliseconds
  return Math.floor(oneMonthLater.getTime() / 1000); // Convert to seconds
}

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot(), // Add this line to your imports
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: calculateExpirationTime() },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, HttpService, ConfigModule, AuthResolver],
})
export class AuthModule {}
