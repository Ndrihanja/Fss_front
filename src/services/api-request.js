import axios from "axios";
import env from '../env';

const http = axios.create({
    baseURL: `http://${env.APP_URL}/api`,
    headers: {
        'Content-type': 'Application/json',
    },
});

export const api = {
    get: (URL, payload) => {
        if (payload !== undefined) {
            return http.get(`${URL}`, payload).then(response => response.data);
        }
        return http.get(`${URL}`).then(response => response.data);
    },
    post: (URL, payload) => {
        return http.post(`${URL}`, payload).then(response => response.data);
    },
    put: (URL, payload) => {
        return http.put(`${URL}`, payload).then(response => response.data);
    },
    delete: (URL, payload) => {
        if (payload !== undefined) {
            return http.delete(`${URL}`, payload).then(response => response.data);
        }
        return http.delete(`${URL}`).then(response => response.data);
    }
}