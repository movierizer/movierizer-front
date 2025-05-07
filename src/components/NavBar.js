import React from "react";
import { Link, NavLink } from "react-router-dom";
import SearchForm from "./SearchForm";

/*This component is used to display the navigation bar for the application*/
export default function NavBar() {
  return (
  <div className="container mx-auto d-block">
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" >
      <div className="container-fluid">
      <span className="navbar-brand mb-0 h1">Movierizer</span> {/* TODO when you click on the title it should redirect to the home page */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div>
          <SearchForm/>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-5">
            <li className="nav-item me-5">
              <NavLink to="/" className="nav-link active">Home</NavLink> {/* This will be disabled when have make the movierizer button */}
            </li>
            <li className="nav-item me-5">
              <NavLink to="/movies" className="nav-link active" >MovieList</NavLink> {/* This will be a part of the lists */}
            </li>
            <li className="nav-item me-5">
              <NavLink to="/addmovies" className="nav-link active" >MovieForm</NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link active dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false"> {/* TODO make the dropdown menu who work really */}
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
