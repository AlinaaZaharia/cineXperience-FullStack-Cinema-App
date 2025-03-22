import axios from "axios";

const BASE_API = "http://localhost:9000/api/cinema";
class MovieService{

    getMovies(){
        return axios.get(BASE_API + "/all");
    }

    getMovieById(id){
        return axios.get(BASE_API + "/viewmovie/" + id);
    }

    updateMovie(id, movie) {
        return axios.put(BASE_API + "/updatemovie/" + id, movie);
    }

    deleteMovie(id){
        return axios.delete(BASE_API + "/deletemovie/" + id);
    }
    
    insertMovie(movie){
        return axios.post(BASE_API + "/insert", movie);
    }
}

export default new MovieService();