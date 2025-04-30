import React from "react";
import { Link, NavLink } from "react-router-dom";

/*This component is used to display the navigation bar for the application*/
export default function NavBar() {
  return (
  <div class="container">
    <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
      <span class="navbar-brand mb-0 h1">Movierizer</span>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <form class="d-flex me-5" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-5">
            <li class="nav-item me-5">
              <Link class="nav-link active" aria-current="page">Home</Link>
            </li>
            <li class="nav-item me-5">
              <Link class="nav-link" href=""><NavLink to="/movies">MovieList</NavLink></Link>
            </li>
            <li class="nav-item me-5">
              <Link class="nav-link" href=""><NavLink to="/addmovies">MovieForm</NavLink></Link>
            </li>
            <li class="nav-item dropdown">
              <Link class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Lists
              </Link>
              <ul class="dropdown-menu">
                <li><Link class="dropdown-item" href="">Collection</Link></li>
                <li><Link class="dropdown-item" href="">Lists</Link></li>
                <li><Link class="dropdown-item" href="">WatchList</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav> 
  </div>
  );
}
