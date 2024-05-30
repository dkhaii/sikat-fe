import React from 'react';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="errorpage-container">
      <div className="errorpage-title-container">
        <h1>OOPS!</h1>
      </div>
      <div className="errorpage-message-container">
        <h1>404 - PAGE NOT FOUND</h1>
      </div>
      <div className="errorpage-button-container">
        <a href="/">
          <button>GO TO HOMEPAGE</button>
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
