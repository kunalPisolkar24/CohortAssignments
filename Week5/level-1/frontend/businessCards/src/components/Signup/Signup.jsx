import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/signup", { username, email, password });
            console.log("Sign up successful: ", response.data);
            navigate("/login", { replace: true });
            setErrorMessage(null);
        }
        catch(error) {
            console.error("Sign up error: ", error);
            if(error.response && error.response.data && error.response.data.message) 
                setErrorMessage(error.response.data.message);
            else
                setErrorMessage("An error occurred during sign up. Please try again later.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">

                        <div className="card-header">
                            <h3 className="text-center">Sign Up</h3>
                        </div>

                        <div className="card-body">
                            { errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username:</label>
                                    <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email:</label>
                                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password:</label>
                                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                                    <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                                </div>

                                <button type="submit" className="btn btn-primary w-100"> Sign Up </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;