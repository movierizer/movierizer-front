import React from 'react';
import { NavLink } from 'react-router-dom';

const MovieCard = ({ movie }) => {

  const formatDate = (dateStr) => {
        if (!dateStr) return 'Date inconnue';
        const date = new Date(dateStr);
        return date.toLocaleString('fr-FR', {
        year: 'numeric',
        });
  };

  return (
    <div className="card m-3 shadow" style={{ width: '18rem',  border: 'none', padding: 0, backgroundColor: '#1a1a1a', color: 'white' }}>
      <NavLink to={`/movies/${movie.idmovie}`}>
        <img
          src={`${process.env.REACT_APP_TMDB_POSTER_URL}w342${movie.poster_path}`}
          className="card-img-top"
          alt={movie.title}
          style={{ height: 'auto', objectFit: 'cover', margin: 0, padding: 0, border: 'none', display: 'block' }}                                                                   
        />
      </NavLink>
      <div className="card-body pb-1">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <NavLink to={`/movies/${movie.idmovie}`} className="movie-title-link flex-grow-1 me-2" style={{color: 'white'}}>
            <h5 className="card-title mb-0 fw-bold fs-4"> 
              {movie.title}
            </h5>
          </NavLink>
          <i className="bi bi-info-circle text-warning"></i> {/** Make the popup to quickly see the details */}
        </div>
        <div>
          <h5>
            realisator
          </h5>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <h6 className="card-subtitle mb-2 justify-content-center" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            {formatDate(movie.release_date)}
          </h6>
          <div className="d-flex align-items-center gap-2">
            <span className="text-warning justify-content-center"  style={{ fontSize: '1.2rem' }}>⭐</span>
            {movie.grade ? (
              <h6 className="card-subtitle mb-0 text-light opacity-75 justify-content-center">
                {movie.grade}
              </h6>
            ) : (
              <h6 className="card-subtitle mb-0 text-light fst-italic opacity-75 justify-content-center">
                No grade
              </h6>
            )}
          </div>        
        </div>
      </div>
    </div>
  );
};

export default MovieCard;