import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-random-math.herokuapp.com',
});

export default api;