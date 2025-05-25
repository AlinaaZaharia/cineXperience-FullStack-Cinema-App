import React, { Component } from 'react';
import SessionService from '../services/SessionService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SeatBooking.css';

class SeatBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionId: this.props.match.params.sessionId,
            sessionData: null,
            selectedSeats: [],
            numTickets: 1,
            loading: true,
            seatRows: new Map(),
            totalPrice: 0,
            ticketPrice: 5.99
        };
    }

    componentDidMount() {
        this.loadSessionData();
    }

    loadSessionData() {
        this.setState({ loading: true });
        const cityId = localStorage.getItem("selectedCityId");
        SessionService.getSessionByIdAndCity(this.state.sessionId, cityId)
            .then(response => {
                const sessionData = response.data;
                const seatRows = this.organizeSeatsByRow(sessionData.seats);

                this.setState({
                    sessionData,
                    seatRows,
                    loading: false
                });
            }).catch(error => {
            console.error("Error loading session data:", error);
            this.setState({ loading: false });
        });
    }

    organizeSeatsByRow(seats) {
        const seatRows = new Map();

        seats.forEach(seat => {
            if (!seatRows.has(seat.roww)) {
                seatRows.set(seat.roww, []);
            }
            seatRows.get(seat.roww).push(seat);
        });

        seatRows.forEach((row, rowNumber) => {
            seatRows.set(rowNumber, row.sort((a, b) => a.number - b.number));
        });

        return seatRows;
    }

    handleSeatClick = (seat) => {
        if (seat.reserved) return;

        const { selectedSeats, numTickets } = this.state;
        const seatIndex = selectedSeats.findIndex(s => s.id === seat.id);

        if (seatIndex >= 0) {
            const newSelectedSeats = selectedSeats.filter(s => s.id !== seat.id);
            this.setState({
                selectedSeats: newSelectedSeats,
                totalPrice: newSelectedSeats.length * this.state.ticketPrice
            });
        } else if (selectedSeats.length < numTickets) {
            const newSelectedSeats = [...selectedSeats, seat];
            this.setState({
                selectedSeats: newSelectedSeats,
                totalPrice: newSelectedSeats.length * this.state.ticketPrice
            });
        }
    }

    handleTicketCountChange = (newCount) => {
        if (newCount < 1 || newCount > 8) return;

        const { selectedSeats } = this.state;
        let newSelectedSeats = selectedSeats;

        if (newCount < selectedSeats.length) {
            newSelectedSeats = selectedSeats.slice(0, newCount);
        }

        this.setState({
            numTickets: newCount,
            selectedSeats: newSelectedSeats,
            totalPrice: newSelectedSeats.length * this.state.ticketPrice
        });
    }

    getSeatClassName = (seat) => {
        const { selectedSeats } = this.state;
        const isSelected = selectedSeats.some(s => s.id === seat.id);

        if (seat.reserved) return 'seat reserved';
        if (isSelected) return 'seat selected';
        return 'seat available';
    }

    formatTime = (timeString) => {
        const date = new Date(timeString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    formatDate = (timeString) => {
        const date = new Date(timeString);
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return date.toLocaleDateString('en-US', options);
    }

    handleBooking = () => {
        const { selectedSeats, sessionData } = this.state;

        if (selectedSeats.length === 0) {
            alert('Please select at least one seat');
            return;
        }

        console.log('Booking seats:', selectedSeats);
        console.log('Session:', sessionData.id);

        alert(`Booking ${selectedSeats.length} seats for ${sessionData.movie.title}`);
    }

    render() {
        const { sessionData, selectedSeats, numTickets, loading, seatRows, totalPrice, ticketPrice } = this.state;

        if (loading) {
            return (
                <div className="booking-page">
                    <div className="loading-container">
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                            <p>Loading session details...</p>
                        </div>
                    </div>
                </div>
            );
        }

        if (!sessionData) {
            return (
                <div className="booking-page">
                    <div className="error-container">
                        <h3>Session not found</h3>
                    </div>
                </div>
            );
        }

        const movie = sessionData.movie;

        return (
            <div className="booking-page">
                <div className="booking-header">
                    <div className="container">
                        <div className="header-content">
                            <h1 className="page-title">Select Seats</h1>
                            <p className="page-subtitle">Choose your perfect seats for the show</p>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row movie-info-section">
                        <div className="col-md-8 movie-info-card d-flex">
                            <div className="movie-poster-small">
                                <img
                                    src={`http://localhost:9000/images/${movie.posterUrl}`}
                                    alt={movie.title}
                                />
                                <div className="play-overlay">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <polygon points="5,3 19,12 5,21"></polygon>
                                    </svg>
                                </div>
                            </div>
                            <div className="movie-details">
                                <h2 className="movie-title">{movie.title}</h2>
                                <div className="movie-meta-info">
                                    <div className="meta-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12,6 12,12 16,14"></polyline>
                                        </svg>
                                        <span>{movie.duration} min</span>
                                    </div>
                                    <div className="meta-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="m9 11 3 3L22 4"></path>
                                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                        </svg>
                                        <span>{movie.genres ? movie.genres.join(', ') : 'N/A'}</span>
                                    </div>
                                </div>
                                <div className="session-info">
                                    <div className="session-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                        <span>{this.formatDate(sessionData.startTime)}</span>
                                    </div>
                                    <div className="session-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12,6 12,12 16,14"></polyline>
                                        </svg>
                                        <span>{this.formatTime(sessionData.startTime)}</span>
                                    </div>
                                    <div className="session-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                        <span>{sessionData.city.name} - {sessionData.hallName}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 ticket-selector-card">
                            <h3>Number of Tickets</h3>
                            <div className="ticket-counter">
                                <button
                                    className="counter-btn"
                                    onClick={() => this.handleTicketCountChange(numTickets - 1)}
                                    disabled={numTickets <= 1}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </button>
                                <span className="ticket-count">{numTickets}</span>
                                <button
                                    className="counter-btn"
                                    onClick={() => this.handleTicketCountChange(numTickets + 1)}
                                    disabled={numTickets >= 8}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </button>
                            </div>
                            <p className="ticket-price">€{ticketPrice} per ticket</p>
                        </div>
                    </div>

                    {/* Seat Map */}
                    <div className="seat-map-section">
                        <div className="screen-indicator">
                            <div className="screen">SCREEN</div>
                        </div>

                        <div className="seat-map">
                            {Array.from(seatRows.entries())
                                .sort(([a], [b]) => a - b)
                                .map(([rowNumber, seats]) => (
                                    <div key={rowNumber} className="seat-row">
                                        <div className="row-label">Row {rowNumber}</div>
                                        <div className="seats-container">
                                            {seats.map(seat => (
                                                <button
                                                    key={seat.id}
                                                    className={this.getSeatClassName(seat)}
                                                    onClick={() => this.handleSeatClick(seat)}
                                                    disabled={seat.reserved}
                                                    title={`Row ${seat.roww}, Seat ${seat.number}`}
                                                >
                                                    {seat.number}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                        </div>

                        {/* Legend */}
                        <div className="seat-legend">
                            <div className="legend-item">
                                <div className="seat available small"></div>
                                <span>Available</span>
                            </div>
                            <div className="legend-item">
                                <div className="seat selected small"></div>
                                <span>Selected</span>
                            </div>
                            <div className="legend-item">
                                <div className="seat reserved small"></div>
                                <span>Reserved</span>
                            </div>
                        </div>
                    </div>

                    {/* Booking Summary */}
                    <div className="booking-summary">
                        <div className="summary-card">
                            <div className="summary-info">
                                <h3>Booking Summary</h3>
                                <div className="selected-seats-info">
                                    {selectedSeats.length > 0 ? (
                                        <p>
                                            Selected Seats: {selectedSeats.map(seat =>
                                            `Row ${seat.roww}-${seat.number}`
                                        ).join(', ')}
                                        </p>
                                    ) : (
                                        <p>No seats selected</p>
                                    )}
                                </div>
                                <div className="price-breakdown">
                                    <div className="price-item">
                                        <span>Tickets ({selectedSeats.length})</span>
                                        <span>€{totalPrice}</span>
                                    </div>
                                    <div className="total-price">
                                        <span>Total</span>
                                        <span>€{totalPrice}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="book-btn"
                                onClick={this.handleBooking}
                                disabled={selectedSeats.length === 0}
                            >
                                Book {selectedSeats.length} Ticket{selectedSeats.length !== 1 ? 's' : ''}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SeatBooking;