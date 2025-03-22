import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieService from '../services/MovieService';
import './ListMovies.css'; // CSS-ul nostru custom

class ListMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };

    this.view = this.view.bind(this);
  }

  componentDidMount() {
    MovieService.getMovies().then((response) => {
      this.setState({ movies: response.data });
    });
  }

  view(id) {
    this.props.history.push(`/viewmovie/${id}`);
  }

  update(id) {
    this.props.history.push(`/updatemovie/${id}`);
  }

  delete(id) {
    this.props.history.push(`/deletemovie/${id}`);
  }

  insert(){
    this.props.history.push('/insertmovie');
  }

  render() {
    return (
      <div className="movie-page container-fluid">
        <h1 className="text-center mb-5">Movies HomePage</h1>
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
                  <div className="mt-auto">
                    <button className="btn btn-info btn-sm w-100 mb-2" onClick={() => this.view(movie.id)}>View</button>
                    <button className="btn btn-secondary btn-sm w-100 mb-2" onClick={() => this.update(movie.id)}>Update</button>
                    <button className="btn btn-danger btn-sm w-100" onClick={() => this.delete(movie.id)}>Delete</button>
                    <button className="btn btn-secondary btn-sm w-100 mb-2" onClick={() => this.insert()}>Insert</button>
                  </div>
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
