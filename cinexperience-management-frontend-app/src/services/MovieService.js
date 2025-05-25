import axios from "axios";

const BASE_API = "http://localhost:9000/api/cinema";
class MovieService{

    getMovies(){
        return axios.get(BASE_API + "/all");
    }

    getMovieById(id){
        return axios.get(BASE_API + "/viewmovie/" + id);
    }

    updateMovie(id, movie, userId) {
        return axios.put(`http://localhost:9000/api/cinema/updatemovie/${id}?userId=${userId}`, movie);
    }

    deleteMovie(id, userId) {
        return axios.delete(`http://localhost:9000/api/cinema/deletemovie/${id}?userId=${userId}`);
    }

    insertMovie(movie, userId) {
        return axios.post(`http://localhost:9000/api/cinema/insert?userId=${userId}`, movie);
    }
}

export default new MovieService();