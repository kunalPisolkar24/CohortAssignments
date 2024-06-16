import React from 'react';

import './ProfileCard.css';

const ProfileCard = () => {
  return (
    <div className="profile-card">
      <div className="profile-header" style={{ backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpW5G-LmOGz_eT2JBzFaBA1faK5jK_EP42Ww&s")' }}>
        <img src="https://images.unsplash.com/photo-1569124589354-615739ae007b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile" className="profile-picture" />
      </div>
      <div className="profile-info">
        <h3>Rita Correia <span className='age'>32</span></h3>
        <p>London</p>
      </div>
      <div className="profile-stats">
        <div>
          <span className="stat-number">80K</span>
          <span className="stat-label">Followers</span>
        </div>
        <div>
          <span className="stat-number">803K</span>
          <span className="stat-label">Likes</span>
        </div>
        <div>
          <span className="stat-number">1.4K</span>
          <span className="stat-label">Photos</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;