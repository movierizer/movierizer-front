import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import  apiService  from '../../services/AuthService';
import Error from '../Error';
import log from 'loglevel';
import ActorList from './ActorList';


export default function MoviePage() {
    const [movie, setMovie] = useState({backdrop_path: null, budget: null, credits: [], directors: [], grade: null, idmovie: null, iduser: null, originel_title: null, poster_path: null, release_date: null, revenue: null, runtime: null, title: null, watchlist: null});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [posterUrl, setPosterUrl] = useState(null);
    const [backdropUrl, setBackdropUrl] = useState(null);
    const [successMessageGrade, setSuccessMessageGrade] = useState(null);
    const [successMessageList, setSuccessMessageList] = useState(null);
    const [isNoted, setIsNoted] = useState(false);
    const [rating, setRating] = useState(70);
    const [watchlist, setWatchlist] = useState("none");
    const [actors, setActors] = useState([]);
    const [directors, setDirectors] = useState([]);

    const {id} = useParams();


    useEffect(() => {

        const fetchmovies = async () => {
            try{
                const response = await apiService.movies.getById(id);//get the movie from the database or the API (SELECT * FROM movies WHERE id = id)
                log.info(response.data); 
                setMovie(response.data);
                console.log(response.data);
                setPosterUrl(`${process.env.REACT_APP_TMDB_POSTER_URL}w342${response.data.poster_path}`); //this is a path to the movie poster with the size w342 (the size can be changed)
                setBackdropUrl(`${process.env.REACT_APP_TMDB_BACKDROP_URL}w1280${response.data.backdrop_path}`); //this is a path to the movie backdrop with the size w1280 (the size can be changed)
                if (response.data.watchlist === null){
                    setWatchlist("none");
                }else{
                    setWatchlist(response.data.watchlist);
                }
                if (response.data.grade !== null){
                    setIsNoted(true);
                }else{
                    setIsNoted(false);
                    setRating(70);
                }
                if (response.data.credits !== null){
                    const filteredActors = response.data.credits.filter(c => c.job === "Actor");
                    setActors(filteredActors); 
                    const filteredDirectors = response.data.credits.filter(c => c.job === "Director");
                    setDirectors(filteredDirectors);
                }
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

    const handleSubmitNote = async (rating) => {

        try{
            const updatedUserMovie = { ...movie, grade: rating };
            setMovie(updatedUserMovie);
            const reponse = await apiService.movies.update(id, updatedUserMovie);
            if (reponse.status === 200){
                setIsNoted(true);
                setSuccessMessageGrade('Note added successfully');
                setTimeout(() => {setSuccessMessageGrade(null);}, 3000); // here you can change the time of the success message 
            }
        } catch (err){
            setError("Failed to add note");
            log.error(err); 
        }
    }

    const handleUnsubmitNote = () => {
        setIsNoted(false);
        setRating(70);
    }

    const handleStatus = async (status) => {
        
        try{
            const updatedUserMovie = { ...movie, watchlist: status };
            setMovie(updatedUserMovie);
            const reponse = await apiService.movies.update(id, updatedUserMovie);
            if (reponse.status === 200){
                setWatchlist(status);
                setSuccessMessageList('movie add to ' + status + ' successfully');
                setTimeout(() => {setSuccessMessageList(null);}, 3000); // here you can change the time of the success message 
            }
        } catch (err){
            setError("Failed to add the status");
            log.error(err); 
        }
        
    }

    const handleUpdateStatus = async (status) => {
        
        try{
            const updatedUserMovie = { ...movie, watchlist: status };
            setMovie(updatedUserMovie);
            const reponse = await apiService.movies.update(id, updatedUserMovie);
            if (reponse.status === 200){
                setWatchlist(status);
                setSuccessMessageList('movie remove to ' + status + ' successfully');
                setTimeout(() => {setSuccessMessageList(null);}, 3000); // here you can change the time of the success message 
            }
        } catch (err){
            setError("Failed to remove the status");
            log.error(err); 
        }
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
                    <h4 className="mb-3 fs-3 fw-bold text-light" style={{ textShadow: '0 0 10px rgba(255,255,255,0.4)' }}>{directors.map((director) => director.people.name).join(', ')}</h4>
                    <p className="mb-5 fs-3 text-secondary fst-italic" style={{ letterSpacing: '1px' }} >{formatDate(movie.release_date)}</p> {/* TODO change the date format to get just the year*/}

                    {/* Tags */}
                    <div style={{ marginBottom: '50px' }} className="fs-4"> {/* TODO the genres are not implemented yet because the data are more complicated to get */}
                        {['drame', 'action', 'crime', 'glasses'].map((tag) => (
                            <span key={tag} className="badge bg-warning text-dark me-5">
                            {tag}
                            </span>
                        ))}
                    </div>
                    
                    {successMessageGrade && (
                        <div className="success-message w-100 text-center">
                            {successMessageGrade}
                        </div>
                    )}
                    {successMessageList && <div className="success-message w-100 text-center">{successMessageList}</div>}
                    <div className="d-flex justify-content-between align-items-end mb-5">
                        {isNoted ? (
                            <div className="rating-wrapper">  {/** TODO make a good CSS */}
                                <h5 className="movie-title text-warning mb-3">grade :</h5>
                                <div className="rating-value text-light fw-bold">
                                    ⭐ {movie.grade}/100
                                </div>
                                <button className="btn btn-warning" onClick={handleUnsubmitNote}>
                                    Change the grade
                                </button>
                            </div>
                            
                        ) : (
                            <div className="slider-wrapper">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    className="custom-slider"
                                    />
                                <span className="note-display me-4">{rating}/100</span>
                                <button className="btn btn-warning" onClick={() =>handleSubmitNote(rating)}>
                                    Noter
                                </button>
                            </div>
                            )}    
                        {/* Boutons à droite */}
                            {watchlist === "none" ? ( // The user has not added the movie to the watchlist or to his collection

                                    <div className="text-end">
                                        <div className="d-flex justify-content-end align-items-center mb-2">
                                            <button className="btn btn-outline-warning me-2 fs-4 text-light " onClick={() =>handleStatus("collection")}>Add to the Collection <i className="bi bi-film fs-2"></i> </button>
                                        </div>
                                        <div className="d-flex justify-content-end align-items-center">
                                            <button className="btn btn-outline-warning me-2 fs-4 text-light" onClick={() =>handleStatus("watchlist")}> Add to the Watchlist <i className="bi bi-eye fs-2"></i> </button>
                                        </div>
                                    </div>
                                ) : watchlist === "watchlist" ? ( // The user has added the movie to the watchlist and so at it's collection too

                                    <div className="text-end">
                                        <div className="confirmation-box text-light d-flex align-items-center justify-content-end mb-2">                                            
                                            <i className="bi bi-check-circle-fill fs-4 text-success me-2"></i>
                                            <span className="me-2">Added to Collection</span>
                                            <button className="btn btn-outline-warning me-2 text-light" onClick={() =>handleUpdateStatus("none")}>remove </button>
                                        </div>
                                        <div className="confirmation-box text-light d-flex align-items-center justify-content-end mt-2">                                        
                                            <i className="bi bi-check-circle-fill fs-4 text-success me-2"></i>
                                            <span className="me-2">Added to Watchlist</span>
                                            <button className="btn btn-outline-warning me-2 text-light" onClick={() =>handleUpdateStatus("collection")}>remove </button>
                                        </div>
                                    </div>

                                ) : ( // The user has added the movie to the collection only 

                                    <div className="text-end">
                                        <div className="confirmation-box text-light d-flex align-items-center justify-content-end mb-2">
                                            <i className="bi bi-check-circle-fill fs-4 text-success me-2"></i>
                                            <span className="me-2">Added to Collection</span>
                                            <button className="btn btn-outline-warning me-2 text-light" onClick={() =>handleUpdateStatus("none")}>remove </button>
                                        </div>
                                        <div className="d-flex justify-content-end align-items-center">
                                            <button className="btn btn-outline-warning me-2 fs-4 text-light" onClick={() =>handleStatus("watchlist")}>Add to the Watchlist <i className="bi bi-eye fs-2"></i> </button>
                                        </div>
                                    </div>
                                    
                                )
                            }
                               
                    </div>
                    
                    {/* Description */}
                    <p className="fs-4">
                    {movie.overview}
                    </p>
                </div>
            </div>
            <ActorList actors={actors}/>
        </div>
    );
}
