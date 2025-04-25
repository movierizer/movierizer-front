import axios from 'axios';

const apiBaseUrl =  'http://localhost:8081'; 
const api = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
    }
});

//add request interceptors for authentification tokens 
/*api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ${token]';
        }
        return config;
    },
    error => Promise.reject(error)
);*/
export const movieService = {
    getAll: () => api.get('/movies'),
    getById: (id) => api.get(`/movies/ ${id}`),
    create: (data) => api.post('/movies', data),
    update: (id, data) => api.put(`/movies/ ${id} `, data),
    delete: (id) => api.delete(`/movie/ ${id} `)
};
export default api;
