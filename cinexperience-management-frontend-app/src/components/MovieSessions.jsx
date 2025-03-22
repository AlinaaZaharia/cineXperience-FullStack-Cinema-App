import React, { Component } from 'react';
import axios from 'axios';
import SessionService from '../services/SessionService';
import 'bootstrap/dist/css/bootstrap.min.css';

class MovieSessions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
      movieId: this.props.match?.params?.movieId || 1
    };
  }

  componentDidMount() {
    SessionService.getSessionsByMovieId(this.state.movieId)
        .then(response => {
            this.setState({ sessions: response.data });
        });
}

  render() {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Movie Sessions</h2>

        {this.state.sessions.length === 0 ? (
          <p>No sessions available.</p>
        ) : (
          <div className="row">
            {this.state.sessions.map((session) => (
              <div className="col-md-4 mb-3" key={session.id}>
                <div className="card shadow">
                  <div className="card-body">
                    <h5 className="card-title">{session.movie?.title || 'Unknown Movie'}</h5>
                    <p><strong>Hall:</strong> {session.hallName}</p>
                    <p><strong>Start Time:</strong> {new Date(session.startTime).toLocaleString()}</p>
                    <p><strong>Seats:</strong> {session.seats?.filter(seat => seat.reserved).length || 0} / {session.seats?.length || 0} reserved</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div> 
    );
  }
}

export default MovieSessions;
