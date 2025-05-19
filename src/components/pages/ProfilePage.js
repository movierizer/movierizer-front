import React, { useState, useEffect } from 'react';
import  apiService  from '../../services/AuthService';
import Error from '../Error';
import log from 'loglevel';
import profil_basic from '../../assets/profil_basic.png';


/* This component is used to display a list of movies*/
const ProfilePage = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tokenTMDB, setTokenTMDB] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [formButton, setFormButton] = useState("Add");

    useEffect(() => {

        const fetchuser = async () => {
            try{
                const response = await apiService.user.get();//get the user who is connected
                if(response.status === 401){
                    setError('You are not logged in, please log in to see your profile');
                    return;
                }
                setUser(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch user');
                setLoading(false);
                log.error(err);
            }
        };
        fetchuser();
    }, []);

    const handleAddToken = async (e) => {
            e.preventDefault();
            setError(null);
    
            try{
                const reponse = await apiService.user.updateTokenTMDB(tokenTMDB);
                if(reponse.status === 401){
                    setError('You are not logged in, please log in to see your profile');
                    return;
                }else{ 
                    setUser(reponse.data);
                    setSuccessMessage('Token added successfully');
                    setTokenTMDB('');
                    setFormButton("Update");
                    setTimeout(() => {setSuccessMessage(null);}, 3000); // here you can change the time of the success message 
                }
            } catch (err){
                setError("No user found");
                log.error(err); 
            }
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return 'Date inconnue';
        const date = new Date(dateStr);
        return date.toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        });
    };

    if (loading) return <div>Loading...</div>
    if (error) return   <div><Error error={error} /></div>

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                    <div className="card-header border-1 border-primary">
                        <h5 className="mb-0">Profil utilisateur</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                        <div className="col-md-4 text-center">
                            <img
                            src={user.profile_picture || profil_basic}
                            alt="Profil"
                            className="img-fluid rounded-circle mb-3"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                            />
                        </div>
                        <div className="col-md-8">
                            <h5>Nom d'utilisateur : <strong>{user.username}</strong></h5>
                            <p>Email : {user.email}</p>
                            <p>Langue : {user.user_language || 'Non spécifiée'}</p>
                            <p>Role : {user.role}</p>
                            <p>Compte actif depuis le : {formatDate(user.create_at)} </p>
                            <p>Dernière mise a jour du compte le : {formatDate(user.updatedAt)}</p>
                            {successMessage && <div className="success-message">{successMessage}</div>}
                            <form className="d-flex me-5 mb-2" role="form" onSubmit={handleAddToken}>
                                <input 
                                className="form-control me-2" 
                                type="text" 
                                placeholder="Token TMDB" 
                                aria-label="Search" 
                                value={tokenTMDB}
                                onChange={(e) => setTokenTMDB(e.target.value)}
                                required/>
                                <button className="btn btn-outline-success" type="submit">{formButton}</button>
                            </form>
                            <button className="btn btn-primary">Modifier le profil</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;