import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { movieService } from '../services/api';
import Error from './Error';

export default function MoviePage() {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {id} = useParams();
    useEffect(() => {

        const fetchmovies = async () => {
            try{
                const response = await movieService.getById(id);//get the movie
                console.log(response.data);
                setMovie(response.data);
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
        <div className="container mt-5">
            <div className="card shadow-lg p-3 mb-5 bg-white rounded">
            <div className="row g-0">
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                {/* Affiche l'image si elle est disponible */}
                {movie.posterPath ? (
                    <img
                    src={movie.posterPath}
                    className="img-fluid rounded-start"
                    alt={`${movie.title} poster`}
                    />
                ) : (
                    <div className="bg-secondary text-white d-flex align-items-center justify-content-center rounded-start"
                        style={{ width: '100%', height: '300px' }}>
                    No Image
                    </div>
                )}
                </div>
                <div className="col-md-8">
                <div className="card-body">
                    <h2 className="card-title">{movie.title}</h2>
                    <h6 className="card-subtitle mb-2 text-muted">{movie.originalTitle || 'No original title'}</h6>
                    <p className="card-text mt-3">{movie.description || 'No description available.'}</p>
                    <ul className="list-group list-group-flush mt-4">
                    <li className="list-group-item"><strong>Grade:</strong> {movie.grade}</li>
                    <li className="list-group-item"><strong>Release Date:</strong> {movie.releaseDate || 'N/A'}</li>
                    <li className="list-group-item"><strong>Runtime:</strong> {movie.runtime} minutes</li>
                    <li className="list-group-item"><strong>Budget:</strong> ${movie.budget.toLocaleString()}</li>
                    <li className="list-group-item"><strong>Revenue:</strong> ${movie.revenue.toLocaleString()}</li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}
