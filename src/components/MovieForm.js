import React, { useState} from 'react';
import { movieService } from '../services/api';
import Error from './Error';

/* This component is used to add a movie with a form */
const MovieForm = () => {
    const [title, setTitle] = useState([]);
    const [grade, setGrade] = useState([]);
    const [description, setDescription] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!title){
            setError('Title is required');
            return;
        }

        const newMovie = {
            title,
            grade,
            description,
        };
        
        try{
          await movieService.create(newMovie); //call the API to add the movie
          setLoading(false);
          setSuccessMessage(newMovie.title + ' added successfully');
          //reset the form
          setTitle('');
          setDescription('');
          setGrade(0);
          setTimeout(() => {setSuccessMessage(null);}, 3000); // here you can change the time of the success message 
        } catch (err){
          setError("Failed to add movie");
          setLoading(false);
          console.log(err); //TODO add loger here
        }
    };

    if (loading) return <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
    if (error) return <div><Error error={error} /></div>

    return(
      <div className="container">
        <div className="row justify-content-center">
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <label htmlFor="title" className="form-label"> 
                Add a movie 
                <input 
                type="text" 
                name="tiltle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required 
                className="form-control border-black"/>
              </label>
          </div>
          <div className="mb-3">
            <label>
              grade:
              <input 
              type="number" 
              name="grade" 
              min={0} 
              max={100}
              value={grade}
              onChange={(e) => setGrade(e.target.value)} 
              className="form-control border-black"/>  
            </label>
          </div>
          <div className="mb-3">
            <label>
              description:
              <input 
              type="text" 
              name="description"
              maxLength="500" 
              value={description}
              onChange={(e) => setDescription(e.target.value)} 
              className="form-control border-black"/>
            </label>
          </div>
          <input className="btn btn-primary" type="submit" value="add" />
        </form>
        </div>
    </div>
    )

}
export default MovieForm;