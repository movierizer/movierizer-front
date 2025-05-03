import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { movieService } from '../services/api';
import Error from './Error';

export default function MoviePage() {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [posterUrl, setPosterUrl] = useState(null);
    const [backdropUrl, setBackdropUrl] = useState(null);

    const {id} = useParams();
    useEffect(() => {

        const fetchmovies = async () => {
            try{
                const response = await movieService.getById(id);//get the movie
                console.log(response.data);
                setMovie(response.data);
                setPosterUrl(`https://image.tmdb.org/t/p/w342${response.data.poster_path}`);
                setBackdropUrl(`https://image.tmdb.org/t/p/w1280${response.data.backdrop_path}`);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch movies');
                setLoading(false);
                console.log(err);
            }
        };
        fetchmovies();
    }, [id]);
    
    if (loading) return <div>Loading...</div>
    if (error) return   <div><Error error={error} /></div>

    return (
        <div className="container-fluid mt-5 position-relative p-0">
            {movie.backdrop_path && (
                    <img
                    src={backdropUrl}
                    className="img-fluid"
                    alt={`${movie.title} backdrop`}
                    style={{ height: '800px', width: '1280px', objectFit: 'cover' }}
                    />
                )}
            <div className="row g-0">
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                    {movie.posterPath ? (
                        <img
                        src={movie.posterPath}
                        className="img-fluid rounded-start"
                        alt={`${movie.title} poster`}
                        />
                    ) : (
                        <div className="bg-secondary text-white d-flex align-items-center justify-content-center rounded-start"
                            style={{ width: '100%', height: '300px' }}>
                            <img src={posterUrl} className="img-fluid z-3" alt={`${movie.title} poster`}/>
                        </div>
                    )}
                </div>
                <div className="container mt-5 pt-5">
                    <div className="card p-4 shadow">
                        <h2 className="card-title">{movie.title}</h2>
                        <h6 className="card-subtitle text-muted">{movie.original_title}</h6>
                        <p className="card-text mt-3">{movie.overview}</p>

                        <ul className="list-group list-group-flush mt-4">
                            <li className="list-group-item">
                            <strong>Grade:</strong> {movie.grade ?? 'N/A'}
                            </li>
                            <li className="list-group-item">
                            <strong>Release Date:</strong> {movie.release_date}
                            </li>
                            <li className="list-group-item">
                            <strong>Runtime:</strong> {movie.runtime} minutes
                            </li>
                            <li className="list-group-item">
                            <strong>Budget:</strong> ${movie.budget?.toLocaleString() ?? 'N/A'}
                            </li>
                            <li className="list-group-item">
                            <strong>Revenue:</strong> ${movie.revenue?.toLocaleString() ?? 'N/A'}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
