import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MovieList from './components/MovieList';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieForm from './components/MovieForm';
import HomePage from './components/HomePage';
import MoviePage from './components/MoviePage';
import log from 'loglevel';


log.setLevel(process.env.NODE_ENV === 'development' ? 'debug' : 'warn');

/*This is the main component of my front you can find the stucture of the app*/
export default function App() {
  return (
    <Router>
      <div className="bg-dark text-white min-vh-100">
        <NavBar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<HomePage />}></Route>
            <Route exact path="/addmovies" element={<MovieForm />}></Route>
            <Route exact path="/movies" element={< MovieList />}></Route>
            <Route exact path="/movies/:id" element={< MoviePage />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}
