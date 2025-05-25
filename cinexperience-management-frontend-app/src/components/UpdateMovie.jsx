import React, { Component } from 'react';
import MovieService from '../services/MovieService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UpdateMovie.css';

class UpdateMovie extends Component {
    constructor(props) {
        super(props);
        const user = JSON.parse(localStorage.getItem("loggedUser")) || {};

        this.state = {
            id: this.props.match?.params?.id,
            title: '',
            description: '',
            genres: '',
            duration: '',
            posterUrl: '',
            user: user
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
        if (!this.state.user || this.state.user.role !== "ADMIN") {
            alert("Access denied. Admins only.");
            this.props.history.push("/");
            return;
        }

        MovieService.getMovieById(this.state.id).then((response) => {
            const movie = response.data;
            this.setState({
                title: movie.title,
                description: movie.description,
                genres: movie.genres?.join(', '),
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
        const { title, description, genres, duration, posterUrl, user } = this.state;

        const updatedMovie = {
            title,
            description,
            genres: genres.split(',').map(g => g.trim()),
            duration,
            posterUrl
        };

        console.log("Updating Movie: ", updatedMovie);

        MovieService.updateMovie(this.state.id, updatedMovie, user.id)
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
