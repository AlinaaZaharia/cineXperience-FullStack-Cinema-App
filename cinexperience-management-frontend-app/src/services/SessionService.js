import axios from "axios";

const BASE_API = "http://localhost:9000/api/sessions";

class SessionService {
    getSessionsByMovieId(movieId) {
        return axios.get(BASE_API + "/viewsession", movieId);
    }

    createSession(sessionData) {
        return axios.post(BASE_API +"/createsession", sessionData);
    }

}

export default new SessionService();
