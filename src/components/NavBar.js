import React from "react";
import { Link, NavLink } from "react-router-dom";

/*This component is used to display the navigation bar for the application*/
export default function NavBar() {
  return (
  <div className="container">
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
      <span className="navbar-brand mb-0 h1">Movierizer</span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <form className="d-flex me-5" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-5">
            <li className="nav-item me-5">
              <NavLink to="/" className="nav-link active">Home</NavLink>
            </li>
            <li className="nav-item me-5">
              <NavLink to="/movies" className="nav-link active" >MovieList</NavLink>
            </li>
            <li className="nav-item me-5">
              <NavLink to="/addmovies" className="nav-link active" >MovieForm</NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link active dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Lists
              </NavLink>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" href="">Collection</Link></li>
                <li><Link className="dropdown-item" href="">Lists</Link></li>
                <li><Link className="dropdown-item" href="">WatchList</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav> 
  </div>
  );
}
