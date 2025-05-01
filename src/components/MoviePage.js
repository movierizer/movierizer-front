import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { movieService } from '../services/api';

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
    if (error) return   <div class="alert alert-primary d-flex align-items-center" role="alert">
    <svg xmlns="http://www.w3.org/2000/svg" class="bi flex-shrink-0 me-2" width="24" height="24" viewBox="0 0 16 16" role="img" aria-label="Warning:">
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </svg>
    <div>
      Failed to fetch movies
    </div>
  </div>

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
