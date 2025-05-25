import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListMovies from './components/ListMovies';
import ViewMovie from './components/ViewMovie';
import UpdateMovie from './components/UpdateMovie';
import Header from './components/Header';
import DeleteMovie from './components/DeleteMovie';
import InsertMovie from './components/InsertMovie';
import MovieSessions from './components/MovieSessions';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <div>
                <Header />
                <div className="container-fluid">
                    <Switch>
                        <Route exact path='/' component={ListMovies} />
                        <Route exact path='/viewmovie/:id' component={ViewMovie} />
                        <Route exact path='/updatemovie/:id' component={UpdateMovie} />
                        <Route exact path='/deletemovie/:id' component={DeleteMovie} />
                        <Route exact path='/insertmovie' component={InsertMovie} />
                        <Route exact path='/viewmoviesession/:movieId' component={MovieSessions} />
                        <Route exact path='/login' component={Login} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
