import { Module } from '@nestjs/common';
import { ReportResolver } from './report.resolver';
import { ReportService } from './report.service';
import { HttpService } from 'src/http/http.service'

@Module({
  providers: [ReportResolver, ReportService, HttpService]
})
export class ReportModule {}
