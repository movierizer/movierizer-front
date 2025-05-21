import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import  apiService  from '../../services/AuthService';
import Error from '../Error';
import log from 'loglevel';


export default function MoviePage() {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [posterUrl, setPosterUrl] = useState(null);
    const [backdropUrl, setBackdropUrl] = useState(null);
    const [rating, setRating] = useState(70);

    const {id} = useParams();
    useEffect(() => {

        const fetchmovies = async () => {
            try{
                const response = await apiService.movies.getById(id);//get the movie from the database or the API (SELECT * FROM movies WHERE id = id)
                log.info(response.data); 
                setMovie(response.data);
                setPosterUrl(`${window._env_.REACT_APP_TMDB_POSTER_URL}w342${response.data.poster_path}`); //this is a path to the movie poster with the size w342 (the size can be changed)
                setBackdropUrl(`${window._env_.REACT_APP_TMDB_BACKDROP_URL}w1280${response.data.backdrop_path}`); //this is a path to the movie backdrop with the size w1280 (the size can be changed)
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch movies');
                setLoading(false);
                log.error(err); 
            }
        };
        fetchmovies();
    }, [id]);
    
    const formatDate = (dateStr) => {
        if (!dateStr) return 'Date inconnue';
        const date = new Date(dateStr);
        return date.toLocaleString('fr-FR', {
        year: 'numeric',
        });
    };

    const handleSubmitNote = async (e) => {
        e.preventDefault();
    }

    if (loading) return <div>Loading...</div>
    if (error) return   <div><Error error={error} /></div>

    return (
        <div className="container " style={{ Width: '1296px' }}>
            {/* Background image section */}
            <div
            className="backdrop-wrapper position-relative mx-auto d-block text-center shadow"
            style={{
            backgroundImage: backdropUrl ? `url(${backdropUrl})` : '',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '450px',
            height: '400px',
            width: '1296px'
            }}>
            <div className="fade-left"></div>
            </div>
            <div className="d-flex bg-dark bg-opacity-75 rounded p-4 text-white" style ={{ Width: '1296px' }}>
                {/* Movie Poster */}
                <img
                    src= {posterUrl} 
                    alt={`${movie.title} Poster`}
                    className="img-fluid me-4 rounded"
                    style={{ width: '300px', height: '500px', objectFit: 'cover' }}
                />

                {/* Movie Info */}
                <div className="flex-grow-1">
                    <h2 className="mb-3 fs-1 fw-bold text-light" style={{ textShadow: '0 0 10px rgba(255,255,255,0.4)' }}>{movie.title}</h2>
                    <p className="mb-5 fs-3 text-secondary fst-italic" style={{ letterSpacing: '1px' }} >{formatDate(movie.release_date)}</p> {/* TODO change the date format to get just the year*/}

                    {/* Tags */}
                    <div style={{ marginBottom: '50px' }} className="fs-4"> {/* TODO the genres are not implemented yet because the data are more complicated to get */}
                        {['drame', 'action', 'crime', 'glasses'].map((tag) => (
                            <span key={tag} className="badge bg-warning text-dark me-5">
                            {tag}
                            </span>
                        ))}
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center mb-5">
                        <div className="slider-wrapper">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                                className="custom-slider"
                                />
                            <span className="note-display me-3">{rating}/100</span>
                            <button className="btn btn-warning" onClick={handleSubmitNote}>
                                Noter
                            </button>
                        </div>
                        {/* Boutons à droite */}
                        <div className="text-end">
                            <div className="d-flex justify-content-end align-items-center mb-2">
                            <button className="btn btn-outline-light me-2 fs-4">Add to the Collection</button>
                            <i className="bi bi-film fs-1 me-5"></i>
                            </div>
                            <div className="d-flex justify-content-end align-items-center">
                            <button className="btn btn-outline-light me-2 fs-4">Add to the Watchlist</button>
                            <i className="bi bi-eye fs-1 me-5"></i>
                            </div>
                        </div>
                    </div>
                    {/* Description */}
                    <p className="fs-4">
                    {movie.overview}
                    </p>
                </div>
            </div>
        </div>
    );
}
