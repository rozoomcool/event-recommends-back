import { Injectable } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter, multerConfig, } from './multer.config';

@Injectable()
export class ImageFileUploadInterceptor extends FileInterceptor('file', {
    storage: multerConfig.storage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 3 * 1024 * 1024 }, // Limit file size to 5MB
}) { }
