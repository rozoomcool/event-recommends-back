
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'generated/prisma';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from './dto/auth';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) { }

  async login(
    email: string,
    password: string,
  ): Promise<LoginResponse> {
    const user = await this.usersService.findOne({ email });
    if (user == null || user == undefined) {
      throw new UnauthorizedException();
    }
    if (!(await bcrypt.compare(password, user.password!))) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, email: user.email, role: user.role };
    return {
      user,
      access: await this.jwtService.signAsync(payload),
      refresh: await this.jwtService.signAsync(
        { id: payload.id },
        {
          secret: process.env.JWT_REFRESH_SECRET!,
          expiresIn: '7d',
        }
      ),
    };
  }

  async register(
    email: string,
    password: string,
    role: Role
  ) {
    await this.usersService.createUser({ email, password, role });
  }

  async refresh(
    refreshToken: string
  ) {
    try {
      // Verify the refresh token
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      // Find user by ID from refresh token payload
      const user = await this.usersService.findOne({ id: payload.id });
      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate new access and refresh tokens
      const newPayload = { id: user.id, email: user.email, role: user.role };
      const newAccessToken = await this.jwtService.signAsync(newPayload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      });
      const newRefreshToken = await this.jwtService.signAsync(
        { id: user.id },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        },
      );

      return {
        user,
        access: newAccessToken,
        refresh: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
