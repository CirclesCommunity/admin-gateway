import { Injectable } from '@nestjs/common';
import { HttpService } from 'src/http/http.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library'

export interface UserPayload {
  id: string;
  tenant: string | 'None';
  orgnizationId: string | undefined | null;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly httpClient: HttpService,
    private readonly configs: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

}
