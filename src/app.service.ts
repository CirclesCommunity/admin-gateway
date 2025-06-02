import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from './http/http.service';

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  getHello(): string {
    return `Well, it appear that I'm still alive!`;
  }

  getPort(): number {
    return this.configService.get<number>('PORT');
  }
}
