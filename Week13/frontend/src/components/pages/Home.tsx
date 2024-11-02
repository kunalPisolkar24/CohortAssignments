import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StickyNavbar from './StickyNavbar';
import BlogList from './BlogList';

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
      <BlogList /> 
    </div>
  );
};

export default Home;
