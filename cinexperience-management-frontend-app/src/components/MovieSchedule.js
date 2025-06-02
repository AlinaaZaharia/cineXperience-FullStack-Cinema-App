import React, { Component } from 'react';
import SessionService from '../services/SessionService';
import CityService from '../services/CityService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MovieSchedule.css';

class MovieSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityId: this.props.match.params.cityId,
            cityName: '',
            selectedDate: new Date(),
            selectedDay: this.getCurrentDay(),
            movieSchedules: [],
            loading: true,
            allSessions: [],
            showDatePicker: false,
            user: JSON.parse(localStorage.getItem("loggedUser") || "null")
        };
    }

    componentDidMount() {
        this.loadCityInfo();
        this.loadAllSessions();
    }

    handleEditSession = (sessionId) => {
        this.props.history.push(`/edit-session/${sessionId}`);
    };

    handleAddSession = () => {
        this.props.history.push(`/add-session/${this.state.cityId}`);
    };


    getCurrentDay() {
        const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
        const today = new Date().getDay();
        return days[today];
    }

    loadCityInfo() {
        const storedCityName = localStorage.getItem("selectedCityName");
        if (storedCityName && storedCityName !== "All Cities") {
            this.setState({ cityName: storedCityName });
        } else if (this.state.cityId) {
            CityService.getAllCities().then(response => {
                const city = response.data.find(c => c.id.toString() === this.state.cityId.toString());
                if (city) {
                    this.setState({ cityName: city.name });
                }
            }).catch(error => {
                console.error("Error loading cities:", error);
            });
        }
    }

    loadAllSessions() {
        this.setState({ loading: true });

        SessionService.getSessionsByCity(this.state.cityId).then(response => {
            const sessions = response.data;
            this.setState({
                allSessions: sessions,
                loading: false
            }, () => {
                this.filterSessionsByDate(this.state.selectedDate);
            });
        }).catch(error => {
            console.error("Error loading sessions:", error);
            this.setState({ loading: false });
        });
    }

    filterSessionsByDate(selectedDate) {
        const { allSessions } = this.state;
        const selectedDateStr = this.formatDateForComparison(selectedDate);
        const sessionsForDay = allSessions.filter(session => {
            if (!session.startTime) return false;
            const sessionDateStr = this.formatDateForComparison(new Date(session.startTime));
            return sessionDateStr === selectedDateStr;
        });

        const movieSchedules = this.groupSessionsByMovie(sessionsForDay);
        this.setState({ movieSchedules });
    }

    formatDateForComparison(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    groupSessionsByMovie(sessions) {
        const movieMap = new Map();

        sessions.forEach(session => {
            const movie = session.movie;
            if (!movie) return;

            if (!movieMap.has(movie.id)) {
                movieMap.set(movie.id, {
                    id: movie.id,
                    title: movie.title,
                    posterUrl: movie.posterUrl,
                    genre: movie.genre,
                    duration: movie.duration,
                    description: movie.description,
                    rating: movie.rating,
                    showtimes: []
                });
            }

            movieMap.get(movie.id).showtimes.push({
                time: this.formatTime(session.startTime),
                sessionId: session.id
            });
        });

        return Array.from(movieMap.values()).map(movie => ({
            ...movie,
            showtimes: movie.showtimes.sort((a, b) => a.time.localeCompare(b.time))
        }));
    }

    formatTime(timeString) {
        const date = new Date(timeString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    handleDayChange = (offset) => {
        const today = new Date();
        const newDate = new Date(today);
        newDate.setDate(today.getDate() + offset);
        const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
        const selectedDay = days[newDate.getDay()];
        this.setState({ selectedDate: newDate, selectedDay });
        this.filterSessionsByDate(newDate);
    }

    handleDatePickerChange = (event) => {
        const selectedDate = new Date(event.target.value);
        const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
        const selectedDay = days[selectedDate.getDay()];
        this.setState({
            selectedDate,
            selectedDay,
            showDatePicker: false
        });
        this.filterSessionsByDate(selectedDate);
    }

    toggleDatePicker = () => {
        this.setState({ showDatePicker: !this.state.showDatePicker });
    }

    formatDateForInput(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    handleShowtimeClick = (sessionId) => {
        this.props.history.push(`/session/${sessionId}`);
    }

    render() {
        const { selectedDay, selectedDate, movieSchedules, cityName, loading, showDatePicker } = this.state;
        const currentDate = new Date();

        const formatDate = (date) => {
            return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
        };

        const formatSelectedDate = () => {
            return formatDate(selectedDate);
        };

        return (
            <div className="schedule-page">
                {/* Header Section */}
                <div className="schedule-header">
                    <div className="container">
                        <div className="header-content d-flex justify-content-between align-items-center">
                            <div>
                                <h1 className="page-title">Movie Schedule</h1>
                                <p className="page-subtitle">Choose your perfect showtime</p>
                            </div>

                            {this.state.user?.role === "ADMIN" && (
                                <button className="btn btn-success" onClick={this.handleAddSession}>
                                    + Add Session
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="container">
                    {/* Day Selector */}
                    <div className="date-selector-section">
                        <div className="day-selector-wrapper">
                            <div className="day-buttons-container">
                                {[...Array(7)].map((_, i) => {
                                    const dayDate = new Date();
                                    dayDate.setDate(currentDate.getDate() + i);
                                    const dayAbbr = dayDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
                                    const isSelected = this.formatDateForComparison(dayDate) === this.formatDateForComparison(selectedDate);

                                    return (
                                        <button
                                            key={i}
                                            className={`day-btn ${isSelected ? 'active' : ''}`}
                                            onClick={() => this.handleDayChange(i)}
                                        >
                                            <div className="day-name">{dayAbbr}</div>
                                            <div className="day-date">{dayDate.getDate()}</div>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="calendar-picker-container">
                                <button
                                    className="calendar-btn"
                                    onClick={this.toggleDatePicker}
                                    title="Select custom date"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                </button>
                                {showDatePicker && (
                                    <div className="date-picker-overlay">
                                        <input
                                            type="date"
                                            className="date-picker-input"
                                            value={this.formatDateForInput(selectedDate)}
                                            onChange={this.handleDatePickerChange}
                                            min={this.formatDateForInput(new Date())}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="selected-date-display">
                            <div className="selected-date-card">
                                <span className="date-label">Showing for</span>
                                <span className="selected-day">{selectedDay}</span>
                                <span className="selected-date-text">{formatSelectedDate()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Movies Grid */}
                    {loading ? (
                        <div className="loading-container">
                            <div className="loading-spinner">
                                <div className="spinner"></div>
                                <p>Loading movies...</p>
                            </div>
                        </div>
                    ) : (
                        <div className="movies-section">
                            {movieSchedules.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-icon">🎬</div>
                                    <h3>No movies scheduled</h3>
                                    <p>There are no movie showings for {selectedDay.toLowerCase()}. Try selecting another day.</p>
                                </div>
                            ) : (
                                <div className="movies-grid">
                                    {movieSchedules.map(movie => (
                                        <div key={movie.id} className="movie-card">
                                            {/* Poster + Overlay */}
                                            <div className="movie-poster-container">
                                                <img
                                                    src={`http://localhost:9000/images/${movie.posterUrl}`}
                                                    alt={movie.title}
                                                    className="movie-poster"
                                                />
                                                <div className="movie-overlay">
                                                    <div className="play-button">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                            <polygon points="5,3 19,12 5,21"></polygon>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="movie-content">
                                                {/* Info Section */}
                                                <div className="movie-info">
                                                    <div className="movie-header d-flex justify-content-between align-items-center">
                                                        <h3 className="movie-title mb-0">{movie.title}</h3>
                                                        {movie.rating && (
                                                            <span className="rating-badge">{movie.rating}</span>
                                                        )}
                                                    </div>

                                                    {movie.description && (
                                                        <p className="movie-description">{movie.description}</p>
                                                    )}

                                                    <div className="movie-meta d-flex flex-wrap gap-3">
                                                        <div className="meta-item d-flex align-items-center">
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <circle cx="12" cy="12" r="10"></circle>
                                                                <polyline points="12,6 12,12 16,14"></polyline>
                                                            </svg>
                                                            <span className="ms-1">{movie.duration} min</span>
                                                        </div>
                                                        {movie.genre && (
                                                            <div className="meta-item">
                                                                <span className="genre">{movie.genre}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Showtimes Section */}
                                                <div className="showtimes-container mt-3">
                                                    <h4 className="showtimes-title">Showtimes</h4>
                                                    <div className="showtimes-grid">
                                                        {movie.showtimes.map((showtime, index) => (
                                                            <div key={index} className="d-flex align-items-center mb-2">
                                                                <button
                                                                    className="showtime-btn me-2"
                                                                    onClick={() => this.handleShowtimeClick(showtime.sessionId)}
                                                                >
                                                                    {showtime.time}
                                                                </button>
                                                                {this.state.user?.role === "ADMIN" && (
                                                                    <button
                                                                        className="btn btn-sm btn-outline-primary"
                                                                        onClick={() => this.handleEditSession(showtime.sessionId)}
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default MovieSchedule;