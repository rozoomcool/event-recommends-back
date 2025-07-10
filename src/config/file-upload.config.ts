import { BadRequestException } from '@nestjs/common';

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/octet-stream'
];

export const ALLOWED_IMAGE_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.webp'
];

export const validateImageFile = (file: Express.Multer.File) => {
  // Проверка расширения файла
  const fileExtension = file.originalname.toLowerCase().slice(file.originalname.lastIndexOf('.'));
  if (!ALLOWED_IMAGE_EXTENSIONS.includes(fileExtension)) {
    throw new BadRequestException('Недопустимое расширение файла. Разрешены только: jpg, jpeg, png, webp');
  }

  // Проверка MIME-типа
  if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
    throw new BadRequestException('Недопустимый тип файла');
  }

  // Дополнительная проверка для application/octet-stream
//   if (file.mimetype === 'application/octet-stream') {
//     // Проверяем сигнатуру файла (первые байты)
//     const buffer = file.buffer;
//     const signatures = {
//       jpeg: [0xFF, 0xD8, 0xFF],
//       png: [0x89, 0x50, 0x4E, 0x47],
//       webp: [0x52, 0x49, 0x46, 0x46]
//     };

//     const isJPEG = signatures.jpeg.every((byte, i) => buffer[i] === byte);
//     const isPNG = signatures.png.every((byte, i) => buffer[i] === byte);
//     const isWEBP = signatures.webp.every((byte, i) => buffer[i] === byte);

//     if (!isJPEG && !isPNG && !isWEBP) {
//       throw new BadRequestException('Недопустимый формат файла');
//     }
//   }

  return true;
}; 