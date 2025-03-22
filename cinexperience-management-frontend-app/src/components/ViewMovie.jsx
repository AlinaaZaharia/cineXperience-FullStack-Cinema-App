import React, {Component} from 'react';
import MovieService from '../services/MovieService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ViewMovie.css';

class ViewMovie extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match?.params?.id,
            movie: {}
        }
    }

    componentDidMount() {
        MovieService.getMovieById(this.state.id)
            .then(response => {
                this.setState({ movie: response.data });
            })
            .catch(error => {
                console.error("Error loading movie:", error);
            });
    }

    render(){
        const { movie } = this.state;

        return (
            <div className="movie-container">
                <h2 className="text-center mb-4">Movie Details</h2>

                {movie.title ? (
                    <div className="movie-card-container">
                        <img src={`http://localhost:9000/images/${movie.posterUrl}`} alt="Poster" className="img-fluid mb-3" style={{ maxHeight: '400px' }} />
                        <h3 className="movie-title">{movie.title}</h3>
                        <p className="movie-details"><strong>Description:</strong> {movie.description}</p>
                        <p className="movie-details"><strong>Genres:</strong> {movie.genres?.join(', ')}</p>
                        <p className="movie-details"><strong>Duration:</strong> {movie.duration} minutes</p>
                    </div>
                ) : (
                    <p>Loading movie details...</p>
                )}
            </div>
        );
    }
}

export default ViewMovie;
