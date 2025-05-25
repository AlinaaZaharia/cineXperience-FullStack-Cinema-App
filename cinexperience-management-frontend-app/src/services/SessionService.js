import axios from "axios";

const BASE_API = "http://localhost:9000/api/sessions";

class SessionService {
    getSessionsByMovieAndCity(movieId, cityId) {
        return axios.get(`${BASE_API}/viewsession/${movieId}/${cityId}`);
    }

    getSessionsByCity(cityId) {
        return axios.get(`${BASE_API}/by-city/${cityId}`);
    }

    getSessionByIdAndCity(sessionId, cityId) {
        return axios.get(`${BASE_API}/${sessionId}/city/${cityId}`);
    }
}

export default new SessionService();
