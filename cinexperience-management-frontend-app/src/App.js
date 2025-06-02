import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ListMovies from './components/ListMovies';
import ViewMovie from './components/ViewMovie';
import UpdateMovie from './components/UpdateMovie';
import Header from './components/Header';
import DeleteMovie from './components/DeleteMovie';
import InsertMovie from './components/InsertMovie';
import MovieSessions from './components/MovieSessions';
import Login from './components/Login';
import MovieSchedule from "./components/MovieSchedule";
import SeatBooking from "./components/SeatBooking";
import EditSession from "./components/EditSession";
import AddSession from "./components/AddSession";
import AddMovie from "./components/AddMovie";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <div>
                <Header />
                <div className="container-fluid">
                    <Switch>
                        {/* Redirect root path to /login */}
                        <Route exact path='/'>
                            <Redirect to="/login" />
                        </Route>

                        <Route exact path='/login' component={Login} />
                        <Route exact path='/listmovies' component={ListMovies} />
                        <Route exact path='/viewmovie/:id' component={ViewMovie} />
                        <Route exact path='/updatemovie/:id' component={UpdateMovie} />
                        <Route exact path='/deletemovie/:id' component={DeleteMovie} />
                        <Route exact path='/insertmovie' component={InsertMovie} />
                        <Route exact path='/viewmoviesession/:movieId' component={MovieSessions} />
                        <Route path="/schedule/:cityId" component={MovieSchedule} />
                        <Route path="/session/:sessionId" component={SeatBooking} />
                        <Route exact path='/listmovies' component={ListMovies} />
                        <Route exact path="/edit-session/:sessionId" component={EditSession} />
                        <Route exact path="/add-session/:cityId" component={AddSession} />
                        <Route path="/addmovie" component={AddMovie} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
