import axios from 'axios';

const BASE_URL =  'http://192.168.3.250:3166';
// http://192.168.3.250:3000
// http://localhost:3166

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});