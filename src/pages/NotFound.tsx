import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NotFound.scss';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-message">
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        className="notfound-btn"
        onClick={() => navigate('/')}
      >
        Go to Login
      </button>
    </div>
  );
};

export default NotFound;
