import { AxiosRequestConfig } from 'axios';
import api from '../../../utils/axios';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../type/type';

export const getLogin = async (request: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await api.post('/login', request);
        return response.data;
    } catch (error) {
        console.error('Error >>>', error);
        throw error;
    }
};

export const getGoogleSigninUrl = async () => {
    try {
        const response = await api.post('/login/google');
        return response.data;
    } catch (error) {
        console.error('Error >>>', error);
        throw error;
    }
}
export const getCallBack = async (params?: AxiosRequestConfig['params']): Promise<LoginResponse> => {
    try {
        const response = await api.get('/login/google/callback', { params });
        return response.data;
    } catch (error) {
        console.error('Error >>>', error);
        throw error;
    }
};

export const getRegister = async (request: RegisterRequest): Promise<RegisterResponse> => {
    try {
        const response = await api.post('/register', request);
        return response.data;
    } catch (error) {
        console.error('Error >>>', error);
        throw error;
    }
};

export const getMyPost = async () => {
    try {
        const response = await api.get('/profile/my-posts');
        return response.data;
    } catch (error) {
        console.error('Error >>>', error);
        throw error;
    }
};

export const getMyPublishPost = async () => {
    try {
        const response = await api.get('/profile/my-posts/publish');
        return response.data;
    } catch (error) {
        console.error('Error >>>', error);
        throw error;
    }
};

export const getMySchedulePost = async () => {
    try {
        const response = await api.get('/profile/my-posts/schedule');
        return response.data;
    } catch (error) {
        console.error('Error >>>', error);
        throw error;
    }
};