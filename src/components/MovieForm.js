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

    if (loading) return <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
    if (error) return <div className="alert alert-danger ">
                        <div className="w-50 h-25 bg-primary text-white">
                          {error}
                        </div>
                      </div>

    return(
      <div class=" position-absolute bottom-50 end-50">
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
              <label htmlFor="title" class="form-label"> 
                Add a movie 
                <input 
                type="text" 
                name="tiltle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required 
                class="form-control border-black"/>
              </label>
          </div>
          <div class="mb-3">
            <label>
              grade:
              <input 
              type="number" 
              name="grade" 
              min={0} 
              max={100}
              value={grade}
              onChange={(e) => setGrade(e.target.value)} 
              class="form-control border-black"/>  
            </label>
          </div>
          <div class="mb-3">
            <label>
              description:
              <input 
              type="text" 
              name="description"
              maxLength="500"
              value={description}
              onChange={(e) => setDescription(e.target.value)} 
              class="form-control border-black"/>
            </label>
          </div>
          <input class="btn btn-primary" type="submit" value="add" />
        </form>
    </div>
    )

}
export default MovieForm;