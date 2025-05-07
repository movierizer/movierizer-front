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
                setPosterUrl(`${TMDB_POSTER_URL}w342${response.data.poster_path}`);
                setBackdropUrl(`${TMDB_BACKDROP_URL}w1280${response.data.backdrop_path}`);
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
        <div className="container " style={{ Width: '1296px' }}>
            {/* Background image section */}
            <div
            className="position-relative mx-auto d-block text-center shadow"
            style={{
            backgroundImage: backdropUrl ? `url(${backdropUrl})` : '',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '450px',
            height: '400px',
            width: '1296px'
            }}
            ></div>
            <div className="d-flex bg-dark bg-opacity-75 rounded p-4 text-white" style ={{ Width: '1296px' }}>
                {/* Movie Poster */}
                <img
                    src= {posterUrl} 
                    alt=" ${movie.title}Poster"
                    className="img-fluid me-4 rounded"
                    style={{ width: '300px', height: '500px', objectFit: 'cover' }}
                />

                {/* Movie Info */}
                <div className="flex-grow-1">
                    <h2>{movie.title}</h2>
                    <p className="mb-10">{movie.release_date}</p>

                    <div className="d-flex justify-content-between mb-10" style={{ height: '100px', marginBottom: '15px' }}>
                        <div className="bg-secondary rounded text-center px-3 py-2" style={{ width: '150px' }}>
                            <h3>Durée</h3>
                            <div>{movie.runtime}</div>
                        </div>
                        <div className="bg-secondary rounded text-center px-3 py-2" style={{ width: '150px' }}>
                            <h3>Status</h3>
                            <div>
                                <span className="badge bg-success">watched</span>
                            </div>
                        </div>
                        <div className="bg-secondary rounded text-center py-2" style={{ width: '150px' }}>
                            <h3>popularity</h3>
                            <div>9.5</div>
                        </div>
                    </div>

                    {/* Tags */}
                    <div style={{ marginBottom: '50px' }}>
                        {['drame', 'action', 'crime', 'glasses'].map((tag) => (
                            <span key={tag} className="badge bg-light text-dark me-2">
                            {tag}
                            </span>
                        ))}
                    </div>

                    {/* Add to Watchlist */}
                    <div className="d-flex align-items-center mb-3" style={{ width: '300px' }}>
                        <input type="text" className="form-control me-2" placeholder="Add" />
                        <button className="btn btn-outline-light">WatchList</button>
                    </div>

                    {/* Description */}
                    <p>
                    {movie.overview}
                    </p>
                </div>
            </div>
        </div>
    );
}
