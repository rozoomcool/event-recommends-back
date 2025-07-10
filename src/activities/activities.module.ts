import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  // providers: [UserService],
  // controllers: [UserController],
  // exports: [UserService]
})
export class ActivitiesModule {}
