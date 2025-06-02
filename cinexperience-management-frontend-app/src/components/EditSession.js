import React, { Component } from "react";
import SessionService from "../services/SessionService";

class EditSession extends Component {
    constructor(props) {
        super(props);
        const user = JSON.parse(localStorage.getItem("loggedUser"));
        const cityId = localStorage.getItem("selectedCityId");

        this.state = {
            sessionId: this.props.match.params.sessionId,
            cityId: cityId,
            session: null,
            hallName: "",
            startTime: "",
            loading: true,
            error: null,
            user: user
        };
    }

    componentDidMount() {
        const { sessionId, cityId } = this.state;
        SessionService.getSessionByIdAndCity(sessionId, cityId)
            .then(response => {
                const session = response.data;
                this.setState({
                    session: session,
                    hallName: session.hallName,
                    startTime: session.startTime,
                    loading: false
                });
            })
            .catch(error => {
                console.error("Error loading session", error);
                this.setState({ error: "Could not load session", loading: false });
            });
    }

    handleUpdate = (e) => {
        e.preventDefault();
        const { session, hallName, startTime } = this.state;

        const updatedSession = {
            movie: { id: session.movie.id },
            city: { id: session.city.id },
            hallName: hallName,
            startTime: startTime
        };

        SessionService.updateSession(session.id, updatedSession)
            .then(() => {
                alert("Session updated successfully!");
                this.props.history.push(`/schedule/${session.city.id}`);
            })
            .catch(error => {
                console.error("Update failed:", error);
                alert("Failed to update session");
            });
    };

    handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this session?");
        if (!confirmDelete) return;

        SessionService.deleteSession(this.state.session.id)
            .then(() => {
                alert("Session deleted successfully!");
                this.props.history.push(`/schedule/${this.state.cityId}`);
            })
            .catch(error => {
                console.error("Delete failed:", error);
                alert("Failed to delete session");
            });
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { loading, error, hallName, startTime, user } = this.state;

        if (!user || user.role !== "ADMIN") {
            return <div className="container mt-4 text-danger">Access Denied. Admins only.</div>;
        }

        if (loading) return <div className="container mt-4">Loading session data...</div>;
        if (error) return <div className="container mt-4 text-danger">{error}</div>;

        return (
            <div className="container mt-5">
                <h2>Edit Movie Session</h2>
                <form onSubmit={this.handleUpdate}>
                    <div className="form-group mt-3">
                        <label>Hall Name</label>
                        <input
                            type="text"
                            name="hallName"
                            value={hallName}
                            onChange={this.handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Start Time</label>
                        <input
                            type="datetime-local"
                            name="startTime"
                            value={startTime}
                            onChange={this.handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <button className="btn btn-primary mt-4 me-2">Update Session</button>
                    <button
                        type="button"
                        className="btn btn-danger mt-4"
                        onClick={this.handleDelete}
                    >
                        Delete Session
                    </button>
                </form>
            </div>
        );
    }
}

export default EditSession;
