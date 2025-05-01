import React, { useState, useEffect } from 'react';
import Error from './Error';
import { movieService } from '../services/api';

export default function SearchForm (){
    const [query, setQuery] = useState(null);
    const [result, setResult] = useState([]);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try{
            const reponse = await movieService.search(query);
            //if query empty then the reponse is the list of the movie in the database
            setResult(reponse.data);
            setQuery('');
            setTimeout(() => {
                if(reponse.data.results.length === 0) setError("No movie found");
            }, 2000);
        } catch (err){
            setError("No movie found");
            setResult([]);
            console.log(err);
        }
    }

    if (error) return <div><Error error={error} /></div> //trouvé une autre manière d'afficher l'erreur

    return(
        <div>
            <div className="position-relative d-inline-block"> 
                <form className="d-flex me-5" role="search" onSubmit={handleSubmit}>
                    <input 
                    className="form-control me-2" 
                    type="search" 
                    placeholder="Search" 
                    aria-label="Search" 
                    onChange={(e) => setQuery(e.target.value)}
                    required/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                {result.total_results > 0 && (
                    <div className=" dropdown position-absolute top-100 start-0 w-100 bg-white border rounded mt-1 z-3"> {/** mettre en position relative */}
                        <span>
                            <div className="card mb-1" style={{maxWidth: '540px'}}>
                                <div className="row g-0 text-black bg-white"> 
                                <div className="col-md-4">
                                    <img src="..." className="img-fluid rounded-start" alt="..."/>
                                </div>
                                <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                </div>
                                </div>
                                </div>
                            </div>
                        </span>
                    </div>
                )} 
            </div>  
        </div>

    )
}