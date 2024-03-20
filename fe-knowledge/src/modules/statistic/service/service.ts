import api from '../../../utils/axios';
export const getStatistics = async (): Promise<any> => {
    try {
        const response = await api.get('/stats');
        return response.data;
    } catch (error) {
        console.error('Get Posts Error:', error);
        throw error;
    }
};