import React from "react";
import { Link } from "react-router-dom";

/*This component is used to display the navigation bar for the application*/
export default function NavBar() {
  return (
    <nav>
      <Link to="/movies">MovieList</Link>
    </nav>
  );
}
