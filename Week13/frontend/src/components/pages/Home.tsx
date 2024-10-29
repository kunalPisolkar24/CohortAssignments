import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StickyNavbar from './StickyNavbar';
const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      navigate('/signin'); 
    }
  }, [navigate]);

  return (
    <div>
      <StickyNavbar />
      <h1>Home</h1>
      <p>Welcome to the protected home page!</p>
    </div>
  );
};

export default Home;
