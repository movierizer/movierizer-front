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

    const {id} = useParams();
    useEffect(() => {

        const fetchmovies = async () => {
            try{
                const response = await apiService.movies.getById(id);//get the movie from the database or the API (SELECT * FROM movies WHERE id = id)
                log.info(response.data); 
                setMovie(response.data);
                setPosterUrl(`${process.env.REACT_APP_TMDB_POSTER_URL}w342${response.data.poster_path}`); //this is a path to the movie poster with the size w342 (the size can be changed)
                setBackdropUrl(`${process.env.REACT_APP_TMDB_BACKDROP_URL}w1280${response.data.backdrop_path}`); //this is a path to the movie backdrop with the size w1280 (the size can be changed)
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch movies');
                setLoading(false);
                log.error(err); 
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
                    alt={`${movie.title} Poster`}
                    className="img-fluid me-4 rounded"
                    style={{ width: '300px', height: '500px', objectFit: 'cover' }}
                />

                {/* Movie Info */}
                <div className="flex-grow-1">
                    <h2>{movie.title}</h2>
                    <p className="mb-10">{movie.release_date}</p> {/* TODO change the date format to get just the year*/}

                    <div className="d-flex justify-content-between mb-10" style={{ height: '100px', marginBottom: '15px' }}>
                        <div className="bg-secondary rounded text-center px-3 py-2" style={{ width: '150px' }}>
                            <h3>Durée</h3>
                            <div>{movie.runtime}</div>
                        </div>
                        <div className="bg-secondary rounded text-center px-3 py-2" style={{ width: '150px' }}>
                            <h3>Status</h3> {/* TODO the status is not implemented yet so it's just a simple print but in term we use the user information in this part*/}
                            <div>
                                <span className="badge bg-success">watched</span>
                            </div>
                        </div>
                        <div className="bg-secondary rounded text-center py-2" style={{ width: '150px' }}>
                            <h3>popularity</h3> {/* TODO Same thing as the status but here the popularity is calculated by the API */}
                            <div>9.5</div>
                        </div>
                    </div>

                    {/* Tags */}
                    <div style={{ marginBottom: '50px' }}> {/* TODO the genres are not implemented yet because the data are more complicated to get */}
                        {['drame', 'action', 'crime', 'glasses'].map((tag) => (
                            <span key={tag} className="badge bg-light text-dark me-2">
                            {tag}
                            </span>
                        ))}
                    </div>

                    {/* TODO Add to Watchlist */}
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
