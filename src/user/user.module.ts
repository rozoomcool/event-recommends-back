import { forwardRef, Module } from '@nestjs/common';
import { UserService as UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [PrismaModule, forwardRef(() => AuthModule)],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
