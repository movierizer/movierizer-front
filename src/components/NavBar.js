import React from "react";
import { Link } from "react-router-dom";
import MovieForm from "./MovieForm";

/*This component is used to display the navigation bar for the application*/
export default function NavBar() {
  return (
    <nav>
      <div>
        <Link to="/movies">MovieList</Link>
      </div>  
      <div>
        <MovieForm /> 
      </div>   
    </nav>
  );
}
