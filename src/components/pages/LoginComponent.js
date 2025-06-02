import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import  apiService  from '../../services/AuthService';
import 'bootstrap/dist/css/bootstrap.min.css';
import Error from '../Error';
import { useAuth } from '../AuthContext';

const LoginComponent = () => {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setToken } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await apiService.auth.login(form);
            if (response.status === 200) {
                setToken(response.data.token);
                navigate('/');
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            setError('Invalid credentials');
        }
    };

    if (error) return <div><Error error={error} /></div>

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Login Form</div>
                        <div className="card-body">
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label>username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={form.username}
                                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                                        placeholder="username"
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
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                            <div className="mt-3">
                                <span>Not registered? <Link to="/register">Register here</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;