import api from '../../../utils/axios';
import { GetFromTokenRp } from '../types/type';

export const getUserInfo = async (): Promise<GetFromTokenRp> => {
    try {
        const response = await api.get('/users/get');
        return response.data;
    } catch (error) {
        console.error('Error >>>', error);
        throw error;
    }
};

export const getUsers = async () => {
    try {
        const response = await api.get('/users');
        return response.data;
    } catch (error) {
        console.error('Error >>>', error);
        throw error;
    }
};