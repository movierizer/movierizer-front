import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import  apiService    from '../../services/AuthService'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Error from '../Error';

const RegisterComponent = () => {
    const [form, setForm] = useState({ email: "", password: "", username: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await apiService.auth.register(form);
            if (response.status === 200){
                navigate('/login');
            }else{
                setError('connexion register failed');
            }
        } catch (error) {
            setError('Registration failed');
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    if (error) return <div><Error error={error} /></div>
    
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Registration</div>
                        <div className="card-body">
                            {error && <div className="alert alert-info">{error}</div>}
                            <form onSubmit={handleRegister}>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={form.username}
                                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                                        placeholder="Username"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        placeholder="Password"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Register</button>
                            </form>
                            <div className="mt-3">
                                <span>Already registered? <Link to="/login">Login here</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterComponent;