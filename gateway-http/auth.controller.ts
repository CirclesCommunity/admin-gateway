import { Controller } from '@nestjs/common';
import { AuthService } from '../src/auth/auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}
}
