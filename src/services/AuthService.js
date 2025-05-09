import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_BASE_URL;
if (!apiBaseUrl) {
    console.error('REACT_APP_BASE_URL is not defined!');
}

const api = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
    }
});

const apiService = {
    auth: {
        register: (user) => api.post('/register', user),
        login: (credentials) => api.post('/login', credentials),
    },
    movies: {
        getAll: () => api.get('/movies'),
        getById: (id) => api.get(`/movies/${id}`),
        create: (data) => api.post('/movies', data),
        update: (id, data) => api.put(`/movies/${id}`, data),
        delete: (id) => api.delete(`/movies/${id}`),
        search: (query) => api.get(`/movies?query=${query}`),
    }
};

export default apiService;
