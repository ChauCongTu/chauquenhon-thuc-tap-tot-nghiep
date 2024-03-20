import { AxiosRequestConfig } from "axios";
import api from '../../../utils/axios';

export const getPosts = async (params?: AxiosRequestConfig['params']): Promise<any> => {
    try {
        const response = await api.get('/posts', { params });
        return response.data;
    } catch (error) {
        console.error('Get Posts Error:', error);
        throw error;
    }
};

export const getPost = async (slug: string): Promise<any> => {
    try {
        const response = await api.get('/posts/' + slug);
        return response.data;
    } catch (error) {
        console.error('Get Posts Error:', error);
        throw error;
    }
};
export const getLike = async (id: number): Promise<any> => {
    try {
        const response = await api.post('/posts/' + id + '/like');
        return response.data;
    } catch (error) {
        console.error('Get Posts Error:', error);
        throw error;
    }
};

export const getCommentLists = async (id: number, params?: AxiosRequestConfig['params']): Promise<any> => {
    try {
        const response = await api.get('/posts/' + id + '/get-comments', { params });
        return response.data;
    } catch (error) {
        console.error('Get Posts Error:', error);
        throw error;
    }
};

export const getComment = async (id: number, request: any): Promise<any> => {
    try {
        const response = await api.post('/posts/' + id + '/comment', request);
        return response.data;
    } catch (error) {
        console.error('Get Posts Error:', error);
        throw error;
    }
};
export const getTags = async () => {
    try {
        const response = await api.get('/tags');
        return response.data;
    } catch (error) {
        console.error('Get Posts Error:', error);
        throw error;
    }
}
export const getAddTag = async (request: any): Promise<any> => {
    try {
        const response = await api.post('/tags', request);
        return response.data;
    } catch (error) {
        console.error('Get Posts Error:', error);
        throw error;
    }
};

export const getSaveDraft = async (request: any): Promise<any> => {
    try {
        const response = await api.post('/posts/draft', request);
        return response.data;
    } catch (error) {
        console.error('Get Posts Error:', error);
        throw error;
    }
};

export const getLoadDraft = async (): Promise<any> => {
    try {
        const response = await api.get('/posts/draft/preview');
        return response.data;
    } catch (error) {
        console.error('Get Posts Error:', error);
        throw error;
    }
};

export const getSavePost = async (request: any): Promise<any> => {
    try {
        const response = await api.post('/posts', request);
        return response.data;
    } catch (error) {
        console.error('Get Posts Error:', error);
        throw error;
    }
};

export const getEditPost = async (id: number, request: any): Promise<any> => {
    try {
        const response = await api.put(`/posts/${id}`, request);
        return response.data;
    } catch (error) {
        console.error('Get Posts Error:', error);
        throw error;
    }
};

export const getSearch = async (params?: AxiosRequestConfig['params']): Promise<any> => {
    try {
        const response = await api.get('/search', { params });
        return response.data;
    } catch (error) {
        console.error('Get Posts Error:', error);
        throw error;
    }
};

export const getTagSearch = async (params?: AxiosRequestConfig['params']): Promise<any> => {
    try {
        const response = await api.get('/tag', { params });
        return response.data;
    } catch (error) {
        console.error('Get Posts Error:', error);
        throw error;
    }
};
export const getDeletePost = async (id: number): Promise<any> => {
    try {
        const response = await api.delete(`/posts/${id}`);
        return response.data;
    } catch (error) {
        console.error('Get Posts Error:', error);
        throw error;
    }
};