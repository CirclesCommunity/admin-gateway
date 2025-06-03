import { Module } from '@nestjs/common';
import { MedmindService } from './medmind.service';
import { MedmindResolver } from './medmind.resolver';
import { HttpService } from 'src/http/http.service'

@Module({
  providers: [MedmindService, MedmindResolver, HttpService]
})
export class MedmindModule {}
