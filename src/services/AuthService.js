import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_BASE_URL;
console.log("!!!!!!!!! ${apiBaseUrl} !!!!!!")
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
        getWatchlist: () => api.get('/lists/watchlist'),
        getCollection: () => api.get('/lists/collection'),
    },
    user: {
        get: () => api.get('/users'),
        update: (user) => api.put('/users', user),
        delete: () => api.delete('/users'),
        updateTokenTMDB: (token) => api.put('/users/token', token),
    },
    auth: {
        register: (user) => api.post('/auth/signup', user),
        login: (credentials) => api.post('/auth/login', credentials),
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
