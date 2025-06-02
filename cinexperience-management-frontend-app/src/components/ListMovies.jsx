import React, { Component } from 'react';
import MovieService from '../services/MovieService';
import 'bootstrap/dist/css/bootstrap.min.css';

class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      duration: 90,
      genres: [],
      selectedGenres: [],
      posterFile: null,
      allGenres: []
    };
  }

  componentDidMount() {
    MovieService.getAllGenres().then(res => {
      this.setState({ allGenres: res.data });
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleGenreChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    this.setState({ selectedGenres: selectedOptions });
  }

  handleFileChange = (e) => {
    this.setState({ posterFile: e.target.files[0] });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', this.state.title);
    formData.append('description', this.state.description);
    formData.append('duration', this.state.duration);
    formData.append('genres', JSON.stringify(this.state.selectedGenres));
    if (this.state.posterFile) {
      formData.append('poster', this.state.posterFile);
    }

    MovieService.addMovie(formData)
        .then(() => {
          alert("Movie added successfully");
          this.props.history.push('/listmovies');
        })
        .catch(error => {
          console.error("Error adding movie:", error);
          alert("Failed to add movie.");
        });
  }

  render() {
    return (
        <div className="container mt-4 text-white">
          <h2 className="mb-4">Add Movie</h2>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" name="description" value={this.state.description} onChange={this.handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Duration (minutes)</label>
              <input type="number" className="form-control" name="duration" value={this.state.duration} onChange={this.handleChange} min="30" max="300" step="5" />
            </div>

            <div className="mb-3">
              <label className="form-label">Genres</label>
              <select className="form-select" multiple value={this.state.selectedGenres} onChange={this.handleGenreChange}>
                {this.state.allGenres.map((genre, index) => (
                    <option key={index} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Poster Image</label>
              <input type="file" className="form-control" accept="image/*" onChange={this.handleFileChange} />
            </div>

            <button type="submit" className="btn btn-primary">Save Movie</button>
          </form>
        </div>
    );
  }
}

export default AddMovie;
