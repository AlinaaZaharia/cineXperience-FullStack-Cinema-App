import React, { Component } from "react";
import SessionService from "../services/SessionService";
import MovieService from "../services/MovieService";
import CityService from "../services/CityService";

class AddSession extends Component {
    constructor(props) {
        super(props);
        const user = JSON.parse(localStorage.getItem("loggedUser") || "null");

        this.state = {
            cityId: this.props.match.params.cityId,
            movies: [],
            selectedMovieId: "",
            hallName: "",
            startTime: "",
            error: null,
            user: user
        };
    }

    componentDidMount() {
        MovieService.getAllMovies()
            .then(response => {
                this.setState({ movies: response.data });
            })
            .catch(error => {
                console.error("Error loading movies", error);
                this.setState({ error: "Failed to load movies" });
            });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { selectedMovieId, cityId, hallName, startTime } = this.state;

        const newSession = {
            movie: { id: selectedMovieId },
            city: { id: cityId },
            hallName,
            startTime
        };

        SessionService.addSession(newSession)
            .then(() => {
                alert("Session added successfully!");
                this.props.history.push(`/schedule/${cityId}`);
            })
            .catch(error => {
                console.error("Failed to add session", error);
                alert("Error adding session");
            });
    };

    render() {
        const { movies, selectedMovieId, hallName, startTime, user, error } = this.state;

        if (!user || user.role !== "ADMIN") {
            return <div className="container mt-4 text-danger">Access Denied. Admins only.</div>;
        }

        return (
            <div className="container mt-5">
                <h2>Add New Session</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group mt-3">
                        <label>Movie</label>
                        <select
                            name="selectedMovieId"
                            value={selectedMovieId}
                            onChange={this.handleChange}
                            className="form-control"
                            required
                        >
                            <option value="" disabled>Select a movie</option>
                            {movies.map(movie => (
                                <option key={movie.id} value={movie.id}>{movie.title}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group mt-3">
                        <label>Hall Name</label>
                        <input
                            type="text"
                            name="hallName"
                            value={hallName}
                            onChange={this.handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group mt-3">
                        <label>Start Time</label>
                        <input
                            type="datetime-local"
                            name="startTime"
                            value={startTime}
                            onChange={this.handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-success mt-4">Add Session</button>
                </form>
            </div>
        );
    }
}

export default AddSession;
