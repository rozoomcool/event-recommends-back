import { Role } from "generated/prisma"
import { User } from '../../../generated/prisma/index';

export interface LoginResponse {
    user: User,
    access: string,
    refresh: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    email: string
    password: string
    role: Role
}