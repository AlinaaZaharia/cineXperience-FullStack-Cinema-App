import React, { Component } from 'react';
import SessionService from '../services/SessionService';
import MovieService from '../services/MovieService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MovieSessions.css';

class MovieSessions extends Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem("loggedUser")) || null;

    this.state = {
      movie: {},
      sessions: [],
      movieId: this.props.match?.params?.movieId || 1,
      movieAvailable: false,
      user: user
    };

    this.updateMovie = this.updateMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  componentDidMount() {
    this.fetchMovieDetails(this.state.movieId);
    this.fetchSessions(this.state.movieId);
  }

  fetchMovieDetails(movieId) {
    MovieService.getMovieById(movieId)
        .then(response => {
          if (response.data) {
            this.setState({
              movie: response.data,
              movieAvailable: true,
            });
          } else {
            this.setState({ movieAvailable: false });
          }
        })
        .catch(error => {
          console.error('Error fetching movie details:', error);
          this.setState({ movieAvailable: false });
        });
  }

  fetchSessions(movieId) {
    SessionService.getSessionsByMovieId(movieId)
        .then(response => {
          this.setState({ sessions: response.data });
        })
        .catch(error => {
          console.error('Error fetching sessions:', error);
          this.setState({ sessions: [] });
        });
  }

  updateMovie() {
    this.props.history.push(`/updatemovie/${this.state.movieId}`);
  }

  deleteMovie() {
    this.props.history.push(`/deletemovie/${this.state.movieId}`);
  }

  render() {
    const { movie, sessions, movieAvailable, user } = this.state;

    if (!movieAvailable) {
      return (
          <div className="container mt-5">
            <h2 className="text-center mb-4">Movie Sessions</h2>
            <p>This movie does not have any sessions available.</p>
          </div>
      );
    }

    return (
        <div className="container mt-5">
          <h2 className="text-center mb-4">{movie.title}</h2>

          <div className="card shadow mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <img
                      src={`http://localhost:9000/images/${movie.posterUrl}`}
                      alt={movie.title}
                      className="img-fluid mb-3"
                  />
                </div>

                <div className="col-md-8">
                  <p><strong>Description:</strong> {movie.description}</p>
                  <p><strong>Genres:</strong> {movie.genres?.join(', ')}</p>
                  <p><strong>Duration:</strong> {movie.duration} min</p>

                  {user?.role === "ADMIN" && (
                      <div className="mt-3">
                        <button className="btn btn-success mr-2" onClick={this.updateMovie}>Update Movie</button>
                        <button className="btn btn-danger" onClick={this.deleteMovie}>Delete Movie</button>
                      </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {sessions.length > 0 ? (
              <div>
                <h4>Sessions:</h4>
                <div className="row">
                  {sessions.map((session) => (
                      <div className="col-md-4 mb-3" key={session.id}>
                        <div className="card shadow">
                          <div className="card-body">
                            <p><strong>Hall:</strong> {session.hallName}</p>
                            <p><strong>Start Time:</strong> {new Date(session.startTime).toLocaleString()}</p>
                            <p><strong>Seats:</strong> {session.seats?.filter(seat => seat.reserved).length || 0} / {session.seats?.length || 0} reserved</p>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
          ) : (
              <p>No sessions available for this movie.</p>
          )}
        </div>
    );
  }
}

export default MovieSessions;
