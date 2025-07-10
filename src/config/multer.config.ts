import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { validateImageFile } from './file-upload.config';

export const multerConfig = {
  storage: diskStorage({
    destination: process.env.MULTER_DEST ?? join(process.cwd(), 'uploads'),
    filename: (req, file, cb) => {
      const ext = extname(file.originalname);
      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, filename);
    }
  })
};

export const imageFileFilter = (req, file, callback) => {
  try {
    validateImageFile(file);
    callback(null, true);
  } catch(e) {
    callback(e, false);
  }
};

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(private configService: ConfigService) { }

  createMulterOptions(): MulterModuleOptions {
    return {
      dest: this.configService.get<string>('MULTER_DEST') ?? join(process.cwd(), 'uploads'),
      ...multerConfig
    };
  }
} 