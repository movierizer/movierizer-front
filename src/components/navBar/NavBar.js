import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchForm from "./SearchForm";
import { useAuth } from '../AuthContext';


/*This component is used to display the navigation bar for the application*/
export default function NavBar() {
  const navigate = useNavigate();
  const { setToken, token } = useAuth();
  

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("username");
    navigate("/login");
  };
  
  return (
  <div className="container mx-auto d-block"  style={{ zIndex: 1000}}>
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" >
      <div className="container-fluid">
      <span className="navbar-brand h1 mb-0 fs-3 me-5 ms-2"><NavLink to="/" className="nav-link active">Movierizer</NavLink></span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div>
          <SearchForm/>
        </div>
        <div className="collapse navbar-collapse  justify-content-center" id="navbarSupportedContent">
          <ul className="navbar-nav gap-3">
            <li className="nav-item me-5">
              <NavLink to="/addmovies" className="nav-link active px-4 fs-5" >MovieForm</NavLink>
            </li>
            <li className="nav-item dropdown me-5">
              <NavLink className="nav-link active dropdown-toggle px-4 fs-5" role="button" data-bs-toggle="dropdown" aria-expanded="false"> 
                Lists
              </NavLink>
              <ul className="dropdown-menu ">
                <li><Link className="dropdown-item" to="/collection">Collection</Link></li>
                <li><Link className="dropdown-item" to="/watchlist">WatchList</Link></li>
              </ul>
            </li>
            {token === null ? <li className="nav-item me-5 px-4 fs-5"> <NavLink to="/register" className="nav-link active">register</NavLink> </li> 
                            : <li className="nav-item me-5 px-4 fs-5"> <button type="button" className="btn btn-outline-light" onClick={handleLogout}>logout</button> </li>}

            <li className="nav-item me-1" style={{ lineHeight: 'normal' }}>
              <NavLink to="/profile" className="nav-link active d-flex align-items-center gap-2 fs-5 px-4">
                {localStorage.getItem('username') ? <span>{localStorage.getItem('username')}</span> : null}
                <i className="bi bi-person-circle fs-4 text-warning-emphasis"></i>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav> 
  </div>
  );
}
