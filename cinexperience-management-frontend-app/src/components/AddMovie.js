import React, { Component } from 'react';
import MovieService from '../services/MovieService';

class AddMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            duration: '',
            genres: [],
            selectedGenres: [],
            posterUrl: '',
            userId: JSON.parse(localStorage.getItem("loggedUser"))?.id || null
        };
    }

    componentDidMount() {
        MovieService.getAllGenres().then(res => {
            this.setState({ genres: res.data });
        });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleGenreToggle = (genre) => {
        const { selectedGenres } = this.state;
        const updated = selectedGenres.includes(genre)
            ? selectedGenres.filter(g => g !== genre)
            : [...selectedGenres, genre];
        this.setState({ selectedGenres: updated });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { title, description, duration, rating, selectedGenres, posterUrl, userId } = this.state;

        const movie = { title, description, duration, rating, genres: selectedGenres, posterUrl };
        MovieService.insertMovie(movie, userId).then(() => {
            alert("Movie added successfully!");
            this.props.history.push('/listmovies');
        }).catch(err => {
            alert("Error adding movie.");
            console.error(err);
        });
    };

    render() {
        const { genres, selectedGenres } = this.state;

        return (
            <div className="container mt-4">
                <h2>Add New Movie</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label>Title:</label>
                        <input type="text" name="title" className="form-control" onChange={this.handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label>Description:</label>
                        <textarea name="description" className="form-control" onChange={this.handleChange} />
                    </div>
                    <div className="mb-3">
                        <label>Duration (min):</label>
                        <input type="number" name="duration" className="form-control" onChange={this.handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label>Poster File Name (e.g. movie.jpg):</label>
                        <input type="text" name="posterUrl" className="form-control" onChange={this.handleChange} />
                    </div>
                    <div className="mb-3">
                        <label>Genres:</label>
                        <div className="d-flex flex-wrap">
                            {genres.map((genre, index) => (
                                <div key={index} className="form-check me-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={selectedGenres.includes(genre)}
                                        onChange={() => this.handleGenreToggle(genre)}
                                        id={`genre-${index}`}
                                    />
                                    <label className="form-check-label" htmlFor={`genre-${index}`}>{genre}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Save Movie</button>
                </form>
            </div>
        );
    }
}

export default AddMovie;
