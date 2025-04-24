import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/MovieList';
import NavBar from './components/NavBar';

export default function App() {
  return (
    <Router>
      <NavBar />
        <Routes path="/" element={<MovieList />}>
           <Route path='/movies' element={<MovieList />} />
        </Routes>
    </Router>
  );
}

