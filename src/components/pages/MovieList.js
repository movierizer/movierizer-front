import React, { useState, useEffect } from 'react';
import  apiService  from '../../services/AuthService';
import Error from '../Error';
import log from 'loglevel';
import MovieCard from '../MovieCard';


/* This component is used to display a list of movies*/
const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchmovies = async () => {
            try{
                const response = await apiService.list.getWatchlist();
                setMovies(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch movies');
                setLoading(false);
                log.error(err);
            }
        };
        fetchmovies();
    }, []);
    
    if (loading) return <div>Loading...</div>
    if (error) return   <div><Error error={error} /></div>
  
    return (
        <div className="container">
            <h1 className="text-white fw-bold mb-4" style={{ fontSize: '2.5rem', borderBottom: '2px solid white', display: 'inline-block', paddingBottom: '0.3rem', marginLeft: '1rem', marginTop: '1rem'}}>
                Watchlist
            </h1>
            <div className="row">
                {movies.map(movie => (
                <div key={movie.id} className="col-md-3 d-flex justify-content-center">
                    <MovieCard movie={movie} />
                </div>
                ))}
            </div>
        </div>
    );
};
export default MovieList;

