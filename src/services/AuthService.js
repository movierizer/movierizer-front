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

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


const apiService = {
    list: {
        getWatchlist: () => api.get('/api/lists/watchlist'),
        getCollection: () => api.get('/api/lists/collection'),
    },
    user: {
        get: () => api.get('/api/users'),
        update: (user) => api.put('/api/users', user),
        delete: () => api.delete('/api/users'),
        updateTokenTMDB: (token) => api.put('/api/users/token', token),
    },
    auth: {
        register: (user) => api.post('/api/auth/signup', user),
        login: (credentials) => api.post('/api/auth/login', credentials),
    },
    movies: {
        getAll: () => api.get('/api/movies'),
        getById: (id) => api.get(`/api/movies/${id}`),
        create: (data) => api.post('/api/movies', data),
        update: (id, data) => api.put(`/api/movies/${id}`, data),
        delete: (id) => api.delete(`/api/movies/${id}`),
        search: (query) => api.get(`/api/movies?query=${query}`),
    }
};

export default apiService;
