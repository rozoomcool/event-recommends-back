import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { MulterConfigService } from './multer.config';

@Module({
  imports: [NestConfigModule],
  providers: [MulterConfigService],
  exports: [MulterConfigService]
})
export class ConfigModule {} 