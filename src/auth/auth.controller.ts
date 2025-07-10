import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest, LoginRequest, LoginResponse } from './dto/auth';
import { Response } from 'express';

@Controller({ path: 'auth', version: '1' })
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post("login")
    async login(@Body() request: LoginRequest, @Res() res: Response) {
        res.status(200).json(await this.authService.login(request.email, request.password));
    }

    @Post("register")
    async register(@Body() request: RegisterRequest) {
        try {
            const user = await this.authService.register(request.email, request.password, request.role);
        } catch (e) {
            throw new HttpException("bad credentials", HttpStatus.BAD_REQUEST);
        }
    }

    @Post("refresh")
    async refresh(@Body() request: {refreshToken: string}) {
        try {
            return await this.authService.refresh(request.refreshToken);
        } catch (e) {
            throw new HttpException("bad credentials", HttpStatus.BAD_REQUEST);
        }
    }

}
