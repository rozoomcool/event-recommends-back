import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService as UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { CustomJwtAuthGuard } from './auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRET_KEY'),
        signOptions: {
            expiresIn: '30d',
        },
      }),
      inject: [ConfigService],
    })
  ],
  providers: [AuthService, CustomJwtAuthGuard, RolesGuard],
  controllers: [AuthController],
  exports: [CustomJwtAuthGuard, RolesGuard, JwtModule]
})
export class AuthModule {}
