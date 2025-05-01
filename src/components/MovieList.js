import React, { useState, useEffect } from 'react';
import { movieService } from '../services/api';
import { Link } from 'react-router-dom';
import Error from './Error';

/* This component is used to display a list of movies*/
const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchmovies = async () => {
            try{
                const response = await movieService.getAll();//get all movies from the database
                setMovies(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch movies');
                setLoading(false);
                console.log(err);
            }
        };
        fetchmovies();
    }, []);
    
    if (loading) return <div>Loading...</div>
    if (error) return   <div><Error error={error} /></div>
  
    return(
        <div className="container mt-4 position-absolute top-30 start-0  pe-5">
            <h2>Movie List</h2>
            <div className='row'>  
                {movies.length === 0 ? (
                    <p>No movies found</p>
                ) : (
                    movies.map(movie => (
                        <div class="row row-cols-1 row-cols-md-1 g-4">
                            <div class="col">
                                <div className="col-md-4 mb-3" key={movie.id}>
                                    <div className="card border-secondary mb-3" style={{ width: '18rem' }}>
                                        <div class="card-body">
                                            <h5 className="card-title">{movie.title}</h5>
                                            <p className="card-text">{movie.description}</p>
                                            <p className="card-text">
                                                <strong>Grade: {movie.grade}</strong>
                                            </p>
                                            <Link to={`/movies/${movie.id}`} className="btn btn-info mr-2">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>   
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
export default MovieList;

