import React, { useState, useEffect } from 'react';
import { movieService } from '../services/api';
import { Link } from 'react-router-dom';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchmovies = async () => {
            try{
                const response = await movieService.getAll();
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
    if (error) return <div className="alert alert-danger">{error}</div>

    return(
        <div className="container mt-4">
            <h2>Movie List</h2>
            <div className='row'>  
                {movies.lenght === 0 ? (
                    <p>No movies found</p>
                ) : (
                    movies.map(movie => (
                        <div className="col-md-4 mb-3" key={movie.id}>
                            <div className="card">
                                <div className="card-body">
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
                    ))
                )}
            </div>
        </div>
    );
};
export default MovieList;

