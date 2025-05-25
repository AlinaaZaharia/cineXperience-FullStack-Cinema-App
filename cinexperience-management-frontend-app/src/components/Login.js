import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: ''
        };

        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.login = this.login.bind(this);
    }

    handleUsername(event) {
        this.setState({ username: event.target.value });
    }

    handlePassword(event) {
        this.setState({ password: event.target.value });
    }

    login(e) {
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        };

        axios.post("http://localhost:9000/api/users/login", user)
            .then(response => {
                localStorage.setItem("loggedUser", JSON.stringify(response.data));
                this.props.history.push("/");
                window.location.reload(); // pentru a re-randa componentele care depind de user
            })
            .catch(error => {
                console.error("Login failed:", error);
                this.setState({ error: "Invalid username or password" });
            });
    }

    render() {
        return (
            <div className="container mt-5">
                <h2 className="text-center">Login</h2>
                {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
                <form onSubmit={this.login}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" className="form-control" value={this.state.username} onChange={this.handleUsername} required />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control" value={this.state.password} onChange={this.handlePassword} required />
                    </div>

                    <button className="btn btn-primary mt-3">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;
