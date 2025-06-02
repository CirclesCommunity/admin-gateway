import { Controller, Get, Header, Param, Post, RawBodyRequest, Req, StreamableFile, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { join, normalize } from 'path';
import { createReadStream } from 'fs';
import { ConfigService } from '@nestjs/config'
import { HttpService } from './http/http.service'

@Controller('')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  @Get("")
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/test/:type/upload")
  getVideoUploadPage(@Param("type") type: string) {
    return `
      <form method="post" enctype="multipart/form-data" action="../../../upload/${type}">
        <input name="file" type="file" />
        <input type="submit" />
      </form>
    `
  }

  @Get("/uploads/*")
  @Header('Cross-Origin-Resource-Policy', 'cross-origin')
  getStreamFile(@Param() params: string[]): StreamableFile {
    console.log("/uploads hit")
    // WATCH OUT! File path manipulation vulnerability
    const path = normalize(join("/uploads", params[0]));
    console.log({ path })
    if (!path.match(/^\/uploads\//)) {
      throw new UnauthorizedException();
    }

    const file = createReadStream(join(process.cwd(), path));
    const mimeType = path.endsWith('.png')
                       ? 'image/png'
                       : path.endsWith('.jpg')
                         ? 'image/jpeg'
                         : path.endsWith('.svg') ? 'image/svg+xml' : 'application/octet-stream';
    return new StreamableFile(file, {
      type: mimeType,
      disposition: 'inline',
    });
  }
}