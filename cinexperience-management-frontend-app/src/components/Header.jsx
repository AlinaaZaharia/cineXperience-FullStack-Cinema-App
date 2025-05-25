import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Header extends Component{
    render() {
        return(
            <header className="p-3 text-white" style={{ backgroundColor: '#3561ac' }}>
                <div class="container">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">

                        </a>

                        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="#" class="nav-link px-2 text-secondary">Home</a></li>
                            <li><a href="#" class="nav-link px-2 text-white">City</a></li>
                            <li><a href="#" class="nav-link px-2 text-white">Genres</a></li>
                            <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
                            <li><a href="#" class="nav-link px-2 text-white">About</a></li>
                        </ul>


                        <div class="text-end">
                            <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
                        </div>
                    </div>
                </div>
            </header>
        )}
}

export default Header;