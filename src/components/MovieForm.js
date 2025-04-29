import React, { useState, useEffect } from 'react';
import { movieService } from '../services/api';
import MovieForm from "./MovieForm";

const MovieForm = () => {
    const [title, setTitle] = useState([]);
    const [grade, setGrade] = useState([]);
    const [description, setDescription] = useState([]);
    const [error, setError] = useState(null);

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

        const reponse = await movieService.create(newMovie);
       
        console.log('Film ajouté:', newMovie);

        setTitle('');
        setDescription('');
        setGrade(0);
        setMovies([...movies, newMovie]);
    };

    return(
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
    )

}
export default MovieForm;