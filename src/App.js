import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MovieList from './components/MovieList';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieForm from './components/MovieForm';
import HomePage from './components/HomePage';


/*This is the main component of my front you can find the stucture of the app*/
export default function App() {
  return (
  <div class="bg-dark text-white min-vh-100">
    <Router>
      <NavBar />
        <Routes>
           <Route exact path="/" element={<HomePage />} />
           <Route path='/movies' element={<MovieList />} />
        </Routes>
    </Router>
  </div>
  );
}
