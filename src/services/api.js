import axios from 'axios';
/*This is a sevice for the api to link the method with his road and the url */
const apiBaseUrl = process.env.REACT_APP_BASE_URL; 
if (!apiBaseUrl) {
    console.error('REACT_APP_BASE_URL is not defined!');
}
/*Set the request headers*/
const api = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
    }
});

/*We can find all the method in the front and her road in the api */
export const movieService = {
    getAll: () => api.get('/movies'),
    getById: (id) => api.get(`/movies/ ${id}`),
    create: (data) => api.post('/movies', data),
    update: (id, data) => api.put(`/movies/ ${id} `, data),
    delete: (id) => api.delete(`/movies/ ${id} `),
    search: (query) => api.get(`/movies?query=${query}`),
};
export default api;
