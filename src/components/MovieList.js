import React, { useState, useEffect } from 'react';
import { movieService } from '../services/api';
import { Link } from 'react-router-dom';

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
    if (error) return   <div class="alert alert-primary d-flex align-items-center" role="alert">
    <svg xmlns="http://www.w3.org/2000/svg" class="bi flex-shrink-0 me-2" width="24" height="24" viewBox="0 0 16 16" role="img" aria-label="Warning:">
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </svg>
    <div>
      Failed to fetch movies
    </div>
  </div>
  
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

