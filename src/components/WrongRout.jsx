import React from 'react';
import './WrongRoute.css';
import { Link } from 'react-router-dom';

const WrongRoute = () => {
  return (
    <div className="wrong-route-container">
      <h1 className="error-code">404</h1>
      <h2 className="error-title">Page Not Found</h2>
      <p className="error-message">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="home-button">
        Go Back Home
      </Link>
    </div>
  );
};

export default WrongRoute;
