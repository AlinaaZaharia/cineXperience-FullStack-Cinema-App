import React, { Component } from 'react';
import MovieService from '../services/MovieService';
import SessionService from '../services/SessionService';
import CityService from '../services/CityService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListMovies.css';

class ListMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      cities: [],
      selectedCityId: '',
    };

    this.handleCityChange = this.handleCityChange.bind(this);
    this.viewDetails = this.viewDetails.bind(this);
  }

  componentDidMount() {
    this.loadAllMovies();
    this.loadCities();
  }

  loadAllMovies() {
    MovieService.getMovies().then((response) => {
      this.setState({ movies: response.data });
    });
  }

  loadCities() {
    CityService.getAllCities().then((response) => {
      this.setState({ cities: response.data });
    });
  }

  handleCityChange(event) {
    const cityId = event.target.value;
    this.setState({ selectedCityId: cityId });

    if (cityId === '') {
      this.loadAllMovies();
    } else {
      SessionService.getSessionsByCity(cityId).then((response) => {
        const uniqueMovies = [];
        const seen = new Set();

        response.data.forEach(session => {
          const movie = session.movie;
          if (movie && !seen.has(movie.id)) {
            seen.add(movie.id);
            uniqueMovies.push(movie);
          }
        });

        this.setState({ movies: uniqueMovies });
      }).catch(error => {
        console.error("Error fetching sessions by city:", error);
      });
    }
  }

  viewDetails(id) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      this.props.history.push(`/viewmovie/${id}`);
    } else {
      this.props.history.push(`/viewmoviesession/${id}`);
    }
  }

  render() {
    return (
        <div className="movie-page container-fluid">
          <h1 className="text-center mb-4">Movies HomePage</h1>

          <div className="mb-4">
            <label htmlFor="citySelect">Filter by City: </label>
            <select
                id="citySelect"
                className="form-select w-auto d-inline-block ms-2"
                value={this.state.selectedCityId}
                onChange={this.handleCityChange}
            >
              <option value=''>All Cities</option>
              {this.state.cities.map(city => (
                  <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
          </div>

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
                        View
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
