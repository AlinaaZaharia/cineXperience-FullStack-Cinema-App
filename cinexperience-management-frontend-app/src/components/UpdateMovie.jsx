import React, { Component } from 'react';
import MovieService from '../services/MovieService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UpdateMovie.css';

class UpdateMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match?.params?.id,
            title: '',
            description: '',
            genres: '',
            duration: '',
            posterUrl: ''
        };

        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeGenresHandler = this.changeGenresHandler.bind(this);
        this.changeDurationHandler = this.changeDurationHandler.bind(this);
        this.changePosterUrlHandler = this.changePosterUrlHandler.bind(this);
        this.updateMovie = this.updateMovie.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        MovieService.getMovieById(this.state.id).then((response) => {
            let movie = response.data;
            this.setState({
                title: movie.title,
                description: movie.description,
                genres: movie.genres?.join(', '), // Convertim lista în string separat prin virgulă
                duration: movie.duration,
                posterUrl: movie.posterUrl
            });
        }).catch(error => {
            console.error("Error loading movie:", error);
        });
    }

    changeTitleHandler(event) {
        this.setState({ title: event.target.value });
    }

    changeDescriptionHandler(event) {
        this.setState({ description: event.target.value });
    }

    changeGenresHandler(event) {
        this.setState({ genres: event.target.value });
    }

    changeDurationHandler(event) {
        this.setState({ duration: event.target.value });
    }

    changePosterUrlHandler(event) {
        this.setState({ posterUrl: event.target.value });
    }

    updateMovie(e) {
        e.preventDefault();
        let updatedMovie = {
            title: this.state.title,
            description: this.state.description,
            genres: this.state.genres.split(',').map(g => g.trim()), // Convertim string-ul în listă de genuri
            duration: this.state.duration,
            posterUrl: this.state.posterUrl
        };

        console.log("Updated Movie: ", updatedMovie);

        MovieService.updateMovie(this.state.id, updatedMovie)
            .then(() => {
                this.props.history.push("/");
            })
            .catch(error => {
                console.error("Error updating movie:", error);
            });
    }

    cancel() {
        this.props.history.push("/");
    }

    render() {
        return (
            <div className='container'>
                <h1 className="text-center">Update Movie</h1>

                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className="card">
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Movie Title</label>
                                        <input type="text" className="form-control" placeholder="Enter Movie Title"
                                            value={this.state.title} onChange={this.changeTitleHandler} />

                                        <label>Movie Description</label>
                                        <textarea className="form-control" placeholder="Enter Description"
                                            value={this.state.description} onChange={this.changeDescriptionHandler} />

                                        <label>Movie Genres (comma separated)</label>
                                        <input type="text" className="form-control" placeholder="e.g. DRAMA, ACTION"
                                            value={this.state.genres} onChange={this.changeGenresHandler} />

                                        <label>Movie Duration (minutes)</label>
                                        <input type="number" className="form-control" placeholder="Enter Duration"
                                            value={this.state.duration} onChange={this.changeDurationHandler} />

                                        <label>Poster URL</label>
                                        <input type="text" className="form-control" placeholder="Enter Poster URL"
                                            value={this.state.posterUrl} onChange={this.changePosterUrlHandler} />
                                    </div>

                                    <button className="btn btn-success mt-3" onClick={this.updateMovie}>Update</button>
                                    <button className="btn btn-danger mt-3 ml-2" onClick={this.cancel}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default UpdateMovie;
