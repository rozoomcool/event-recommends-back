import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServeStaticModuleOptionsFactory, ServeStaticModuleOptions } from '@nestjs/serve-static';
import { join } from 'path';

@Injectable()
export class ServeStaticConfigService implements ServeStaticModuleOptionsFactory {
  constructor(private configService: ConfigService) {}

  createLoggerOptions(): ServeStaticModuleOptions[] {
    return [{
      rootPath: this.configService.get<string>('MULTER_DEST') ?? join(process.cwd(), 'uploads'),
      serveRoot: "/uploads"
    }];
  }
} 