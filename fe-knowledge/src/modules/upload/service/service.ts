import { UploadResponse } from "../type/type";
import api from '../../../utils/axios';

export const getUpload = async (request: FormData): Promise<UploadResponse> => {
    try {
        const response = await api.post('/upload-image', request, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error >>>', error);
        throw error;
    }
};
