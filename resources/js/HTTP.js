import axios from 'axios';
import nprogress from 'nprogress';

// create a new axios instance
const instance = axios.create({
    baseURL: '/api'
});

// before a request is made start the nprogress
instance.interceptors.request.use(config => {
    nprogress.start();

    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = 'Bearer ' + token.access_token;
    }

    return config;
});

// before a response is returned stop nprogress
instance.interceptors.response.use(response => {
    nprogress.done();
    return response;
}, error => {
    nprogress.done();
    return Promise.reject(error);
});

export default instance;