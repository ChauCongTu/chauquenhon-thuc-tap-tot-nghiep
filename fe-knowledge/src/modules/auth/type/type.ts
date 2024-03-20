import { User } from "../../users/types/type";

export interface LoginRequest {
    email: string,
    password: string
}
export interface LoginResponse {
    success: boolean,
    data: User | null,
    message: string | null,
    token: string | null
}

export interface RegisterRequest {
    email: string,
    password: string,
    password_confirmation: string,
    username: string,
    full_name: string
}

export interface RegisterResponse {
    success: boolean,
    data: User | null,
    message: string | null,
    token: string | null
}