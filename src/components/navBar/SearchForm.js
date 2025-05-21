import React, { useState, useEffect } from 'react';
import Error from '../Error';
import  apiService  from '../../services/AuthService';
import { NavLink } from 'react-router-dom';
import { useRef } from 'react';
import log from 'loglevel';

export default function SearchForm (){
    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);
    const [error, setError] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const wrapperRef = useRef(null); //useRef is use to make reference to HTML elements  

    /* This is a component to search some movies with a call to TMDB API */
    const handleSearch = async (e) => {
        e.preventDefault();
        setError(null);

        try{
            const reponse = await apiService.movies.search(query);
            setResult(reponse.data);
            setTimeout(() => {
                if(query === ''){
                    if(reponse.data.results.length === 0) setError("No movie found");
                }
            }, 2000);
        } catch (err){
            setError("No movie found");
            setResult([]);
            log.error(err); 
        }
    }

    //this useEffect is use to show the result of the search when we have results
    useEffect(() => {
        if (result && result.total_results > 0) {
          setShowResults(true);
        }
      }, [result]);

    //function to close the result of the search when we clicked outside of the page
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setShowResults(false);
            setQuery('');
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    //this function is call when you click on a movie in the result
    const handleResultClick = () => {
        setShowResults(false);
        setQuery(''); 
        setError(null);
    };
    

    if (error) return <div><Error error={error} /></div> //TODO find a other way to print the error and put a message where no movie was found 

    return(
        <div>
            <div className="position-relative d-block" style={{Width: '700px'}}> 
                <form className="d-flex me-5" role="search" onSubmit={handleSearch}>
                    <input 
                    className="form-control me-2" 
                    type="search" 
                    placeholder="Search" 
                    aria-label="Search" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required/>
                    <button className="btn btn btn-outline-warning" type="submit">Search</button>
                </form>
                {showResults &&result.total_results > 0 && (
                    <div ref={wrapperRef}
                    className="position-absolute top-100 start-0 bg-dark border rounded shadow z-3"
                    style={{ maxHeight: '300px', width: '700px', overflowY: 'auto', zIndex: 10 }}>
                        {/* This is the list of movie result of the call to the API */}
                        {result.results.map(movie => (     
                            <li key={movie.id} className="list-unstyled m-0 p-0"> 
                                <span>
                                    <div className="card mb-0" style={{ width: '700px'}}>
                                        <div className="row g-0 text-white bg-dark"> 
                                        <div className="col-md-2">
                                            {/* TODO add a picture for no movie found */}
                                            {/* TODO make the poster clickable to go to the movie page */}
                                            <img src={`${window._env_.REACT_APP_TMDB_POSTER_URL}w92${movie.poster_path}`} className="img-fluid rounded-start" alt=""/> 
                                        </div>
                                        <div className="col-md-10">
                                        <div className="card-body">
                                            <NavLink to={`/movies/${movie.id}`} 
                                            className="card-title nav-link-active text-decoration-none" 
                                            onClick={handleResultClick}> {/* If you click on a movie in the result it will go to the movie page */}
                                                <div className="fw-bold">
                                                    {movie.title}
                                                </div>
                                            </NavLink>  
                                            <p className="card-text">{/* This is to have a short description of the movie we print only 150 characters */}
                                                {movie.overview.length > 150
                                                ? movie.overview.substring(0, 150) + "..."
                                                : movie.overview}
                                            </p>
                                            <p className="card-text"><small className="text-white bg-dark">{movie.release_date}</small></p> {/* TODO remplace by the director and maybe put the release year bellow the director name */}
                                        </div>
                                        </div>
                                        </div>
                                    </div>
                                </span>
                            </li> 
                        ))}
                    </div>
                )} 
            </div>  
        </div>

    )
}