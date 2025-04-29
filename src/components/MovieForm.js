import React, { useState} from 'react';
import { movieService } from '../services/api';

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
          const reponse = await movieService.create(newMovie);
          setLoading(false);
          console.log('Movie added :', newMovie);
          setSuccessMessage(newMovie.title + ' added successfully');
          setTitle('');
          setDescription('');
          setGrade(0);
          setTimeout(() => {setSuccessMessage(null);}, 3000); 
        } catch (err){
          setError("Failed to add movie");
          setLoading(false);
          console.log(err);
        }
    };

    if (loading) return <div>Loading...</div>
    if (error) return <div className="alert alert-danger">{error}</div>

    return(
      <div>
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div>
              <label htmlFor="title"> Add a movie</label> 
              <input 
              type="text" 
              name="tiltle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required />
          </div>
          <div>
            <label>
              grade:
              <input 
              type="number" 
              name="grade" 
              min={0} 
              max={100}
              value={grade}
              onChange={(e) => setGrade(e.target.value)} />  
            </label>
          </div>
          <div>
            <label>
              description:
              <input 
              type="text" 
              name="description"
              maxLength="500"
              value={description}
              onChange={(e) => setDescription(e.target.value)} />
            </label>
          </div>
          <input type="submit" value="add" />
        </form>
      </div>
    )

}
export default MovieForm;