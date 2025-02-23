 import React from 'react';
 import './HomePage.css';
 import { Link } from 'react-router-dom';
 
 function HomePage() {
  
   return (
      <div className="homepage-container">
        <div className="homepage-hero">
          <h1 className="homepage-title">Welcome to Book World</h1>
          <p className="homepage-subtitle">
            Discover your next favorite book and build your personal reading list.
          </p>
          <Link href="/search" className="homepage-btn">
            Start Exploring
          </Link>
        </div>
      </div>
   );
 };
 
 export default HomePage;