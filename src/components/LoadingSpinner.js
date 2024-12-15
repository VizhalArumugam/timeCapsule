import React from 'react';
import '../styles/main1.css'; // Add your CSS for the spinner

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
