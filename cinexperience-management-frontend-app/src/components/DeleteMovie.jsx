import React, { Component } from 'react';
import MovieService from '../services/MovieService';
import 'bootstrap/dist/css/bootstrap.min.css';

class DeleteMovie extends Component {
    constructor(props) {
        super(props);
        const user = JSON.parse(localStorage.getItem("loggedUser")) || {};

        this.state = {
            id: this.props.match?.params?.id,
            movie: {},
            user: user
        };

        this.delete = this.delete.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        // Verifică dacă e admin
        if (!this.state.user || this.state.user.role !== "ADMIN") {
            alert("Access denied. Admins only.");
            this.props.history.push("/");
            return;
        }

        MovieService.getMovieById(this.state.id)
            .then((response) => {
                this.setState({ movie: response.data });
            })
            .catch(error => {
                console.error("Error loading movie for delete:", error);
            });
    }

    delete(e) {
        e.preventDefault();
        MovieService.deleteMovie(this.state.id, this.state.user.id)
            .then(() => {
                this.props.history.push("/");
            })
            .catch(error => {
                console.error("Error deleting movie:", error);
            });
    }

    cancel() {
        this.props.history.push("/");
    }

    render() {
        const { title, description, genres, duration, posterUrl } = this.state.movie;

        return (
            <div className="container">
                <h2 className="text-center text-danger">Are you sure you want to delete this movie?</h2>
                <div className="card mt-4">
                    <div className="card-body">
                        <img src={`http://localhost:9000/images/${posterUrl}`} alt="Poster" className="img-fluid mb-3" />
                        <h3>{title}</h3>
                        <p><strong>Description:</strong> {description}</p>
                        <p><strong>Genres:</strong> {genres?.join(', ')}</p>
                        <p><strong>Duration:</strong> {duration} min</p>

                        <button className="btn btn-danger mr-2" onClick={this.delete}>Yes, Delete</button>
                        <button className="btn btn-secondary" onClick={this.cancel}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteMovie;
