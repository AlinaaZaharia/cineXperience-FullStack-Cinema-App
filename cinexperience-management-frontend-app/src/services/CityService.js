// src/services/CityService.js
import axios from 'axios';

const CITY_API_BASE_URL = "http://localhost:9000/api/cities";

class CityService {
    getAllCities() {
        return axios.get(`${CITY_API_BASE_URL}/all`);
    }

    addCity(city) {
        return axios.post(`${CITY_API_BASE_URL}/add`, city);
    }
}

export default new CityService();
