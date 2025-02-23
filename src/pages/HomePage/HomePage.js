 import React from 'react';
 import './HomePage.css';
 
 function HomePage() {
  
   return (
      <div className="homepage-container">
        <div className="homepage-hero">
          <h1 className="homepage-title">Welcome to Book World</h1>
          <p className="homepage-subtitle">
            Discover your next favorite book and build your personal reading list.
          </p>
          <a href="/search" className="homepage-btn">
            Start Exploring
          </a>
        </div>
      </div>
   );
 };
 
 export default HomePage;