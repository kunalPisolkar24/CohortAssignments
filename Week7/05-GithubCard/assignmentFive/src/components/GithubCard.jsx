import React, { useState, useEffect } from 'react';
import './GithubCard.css'; 

const GithubCard = () => {

    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        let timeoutId = null; 

        const fetchUserData = async () => {
            if (username) {
                const response = await fetch(`https://api.github.com/users/${username}`);
                const data = await response.json();
                setUserData(data);
            }
        };

        timeoutId = setTimeout(() => {
            fetchUserData();
        }, 500);

        return () => clearTimeout(timeoutId);

    }, [username]);

    const handleChange = (e) => {
        setUsername(e.target.value);
    };


    return (
        <div className="container">
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter GitHub username"
                    value={username}
                    onChange={handleChange}
                />
            </div>

            {userData && (
                <div className="github-card">
                    <div className="card-header">
                        <img
                            src={userData.avatar_url}
                            alt="Profile"
                            className="profile-picture"
                        />
                        <div className="profile-info">
                            <h3>{userData.name || userData.login}</h3>
                            <p>@{userData.login}</p>
                            {userData.bio && <p className="bio">{userData.bio}</p>}
                        </div>
                    </div>
                    <div className="card-stats">
                        <div>
                            <span className="stat-number">{userData.followers}</span>
                            <span className="stat-label">Followers</span>
                        </div>
                        <div>
                            <span className="stat-number">{userData.following}</span>
                            <span className="stat-label">Following</span>
                        </div>
                        <div>
                            <span className="stat-number">{userData.public_repos}</span>
                            <span className="stat-label">Repositories</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GithubCard;