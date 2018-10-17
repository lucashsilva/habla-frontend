import axios from 'axios';
import * as firebase from 'firebase';

export const api = axios.create({
    baseURL: 'http://localhost:3000',
});

api.interceptors.request.use(async(config) => {
    if (firebase.auth().currentUser) {
        if (firebase.auth().currentUser) {
            let token = await firebase.auth().currentUser.getIdToken();
            config.headers['Authorization'] = token;
            console.log(token);
        }
    }

    return config;
});