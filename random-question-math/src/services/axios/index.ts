import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-random-questions-math.onrender.com',
});

export default api;