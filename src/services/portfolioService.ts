import apiClient from '@/lib/apiClient';

export async function fetchPortfolios(params = { page: 1, limit: 10 }) {
    try {
        const response = await apiClient.get('/api/portfolios', { params });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch portfolios:', error);
        return [];
    }
}
