import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/cards";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/login", { email, password });
            const token = response.data.token;
            localStorage.setItem("token", token); // Store JWT in local Storage
            navigate(from, { replace: true }); // Redirect to appropriate route
        }
        catch(error) {
            console.error("Login error: ", error);
            if(error.response) 
                setErrorMessage(error.response.data.message || "Invalid credentials");
            else if(error.request)
                setErrorMessage("Network error. Please try again later.");
            else 
                setErrorMessage("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">

                        <div className="card-header">
                            <h3 className="text-center">Login</h3>
                        </div>

                        <div className="card-body">
                            { errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input type="email" className="form-control" id="email"  value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            
                            <button className="btn btn-primary w-100" type="submit"> Login </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;