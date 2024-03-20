import { AxiosRequestConfig } from 'axios';
import api from '../../../utils/axios';
import { Category } from '../types/type';

export const getCategories = async () => {
    try {
        const response = await api.get('/categories');
        return response.data;
    } catch (error) {
        console.error('Error >>>', error);
        throw error;
    }
};

export const getCategoryThemes = async () => {
    try {
        const response = await api.get('/theme');
        return response.data;
    } catch (error) {
        console.error('Error >>>', error);
        throw error;
    }
};

export const getCategoryPosts = async (slug: string, params: AxiosRequestConfig['params']) => {
    try {
        const response = await api.get(`/categories/${slug}/posts`, { params });
        return response.data;
    } catch (error) {
        console.error('Error >>>', error);
        throw error;
    }
};


export const storeCategory = async (data: { id: number, name: string, summary: string }): Promise<any> => {
    try {
        const response = await api.post(`/categories`, data);
        return response.data;
    } catch (error) {
        console.error('Error >>>', error);
        throw error;
    }
};

export const updateCategory = async (id: number, data: Category | null) => {
    try {
        const response = await api.put(`/categories/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error >>>', error);
        throw error;
    }
};

export const deleteCategory = async (id: number | null | undefined) => {
    try {
        const response = await api.delete(`/categories/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error >>>', error);
        throw error;
    }
};