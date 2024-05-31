import axios from 'axios';

const http = axios.create({
    baseURL: 'https://the-one-api.dev/v2'
});

const API_KEY = 'Bearer ' + import.meta.env.VITE_API_KEY;

const headers = {
    'Authorization': API_KEY
};

export default {
    getQuotes() {
        return http.get('/quote?limit=40&page=3', {
            headers: headers
        });
    },
    getMovies() {
        return http.get('/movie', {
            headers: headers
        });
    }

}