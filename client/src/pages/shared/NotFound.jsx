
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container py-5 text-center">
      <div className="mb-4">
        <span className="display-1 fw-bold">404</span>
      </div>
      <h1 className="display-5 mb-4">Page Not Found</h1>
      <p className="lead mb-5">We couldn't find the page you were looking for.</p>
      <Link to="/" className="btn btn-primary btn-lg px-4">
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
