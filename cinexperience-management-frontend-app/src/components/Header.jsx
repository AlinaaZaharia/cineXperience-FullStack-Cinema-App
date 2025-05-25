import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CityService from '../services/CityService';

function getUserFromStorage() {
    try {
        const raw = localStorage.getItem("loggedUser");
        if (!raw || raw === "undefined") return null;
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: getUserFromStorage(),
            cities: [],
            selectedCityId: localStorage.getItem("selectedCityId") || '',
            showCityDropdown: false
        };
    }

    componentDidMount() {
        if (this.state.user) {
            CityService.getAllCities().then(res => {
                this.setState({ cities: res.data });
            });
        }
    }

    handleCitySelect = (cityId, cityName) => {
        this.setState({
            selectedCityId: cityId,
            showCityDropdown: false
        });
        localStorage.setItem("selectedCityId", cityId);
        localStorage.setItem("selectedCityName", cityName);

        if (cityId) {
            window.location.href = `/schedule/${cityId}`;
        } else {
            window.location.href = "/";
        }
    }

    toggleCityDropdown = () => {
        this.setState({ showCityDropdown: !this.state.showCityDropdown });
    }

    render() {
        const { user, cities, selectedCityId, showCityDropdown } = this.state;
        const selectedCityName = localStorage.getItem("selectedCityName") || "Select City";

        return (
            <header className="p-3 text-white" style={{ backgroundColor: '#3561ac' }}>
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        </a>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="/" className="nav-link px-2 text-secondary">Home</a></li>

                            {user && (
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle px-2 text-white"
                                        href="#"
                                        role="button"
                                        onClick={this.toggleCityDropdown}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {selectedCityId ? selectedCityName : "Cities"}
                                    </a>
                                    {showCityDropdown && (
                                        <ul className="dropdown-menu show" style={{ position: 'absolute', zIndex: 1000 }}>
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        this.handleCitySelect('', 'All Cities');
                                                    }}
                                                >
                                                    All Cities
                                                </a>
                                            </li>
                                            {cities.map(city => (
                                                <li key={city.id}>
                                                    <a
                                                        className="dropdown-item"
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            this.handleCitySelect(city.id, city.name);
                                                        }}
                                                    >
                                                        {city.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            )}

                            <li><a href="#" className="nav-link px-2 text-white">Genres</a></li>
                            <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
                            <li><a href="#" className="nav-link px-2 text-white">About</a></li>
                        </ul>

                        <div className="text-end">
                            <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;