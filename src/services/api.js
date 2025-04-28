import axios from 'axios';

const apiBaseUrl = process.env.FRONT_BASE_URL; 
const api = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const movieService = {
    getAll: () => api.get('/movies'),
    getById: (id) => api.get(`/movies/ ${id}`),
    create: (data) => api.post('/movies', data),
    update: (id, data) => api.put(`/movies/ ${id} `, data),
    delete: (id) => api.delete(`/movies/ ${id} `)
};
export default api;
