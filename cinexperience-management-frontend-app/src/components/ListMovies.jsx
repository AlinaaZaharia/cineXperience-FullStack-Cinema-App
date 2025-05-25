import React, { Component } from 'react';
import MovieService from '../services/MovieService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListMovies.css';

function getUserFromStorage() {
  try {
    const raw = localStorage.getItem("loggedUser");
    if (!raw || raw === "undefined") return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

class ListMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      user: getUserFromStorage()
    };

    this.viewDetails = this.viewDetails.bind(this);
  }

  componentDidMount() {
    this.loadAllMovies();
  }

  loadAllMovies() {
    MovieService.getMovies().then((response) => {
      this.setState({ movies: response.data });
    });
  }

  viewDetails(id) {
    const user = getUserFromStorage();

    if (!user) {
      this.props.history.push(`/viewmovie/${id}`);
    } else if (user.role === "ADMIN") {
      this.props.history.push(`/updatemovie/${id}`);
    } else {
      this.props.history.push(`/viewmoviesession/${id}`);
    }
  }

  render() {
    return (
        <div className="movie-page container-fluid">
          <h1 className="text-center mb-4">Movies HomePage</h1>

          <div className="row">
            {this.state.movies.map((movie) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-2 mb-4" key={movie.id}>
                  <div className="movie-card-custom card h-100 shadow-sm">
                    <img
                        src={`http://localhost:9000/images/${movie.posterUrl}`}
                        alt={movie.title}
                        className="card-img-top movie-poster"
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{movie.title}</h5>
                      <button
                          className="btn btn-info btn-sm mt-auto"
                          onClick={() => this.viewDetails(movie.id)}
                      >
                        {this.state.user?.role === "ADMIN"
                            ? "Edit"
                            : this.state.user
                                ? "View Sessions"
                                : "View"}
                      </button>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
    );
  }
}

export default ListMovies;