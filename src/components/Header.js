
import React,{useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import './components.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const renderNavLinks = () => {
    if (location.pathname === '/') {
      return (
        <>
          <Link to="/search" className="nav-link">Search</Link>
          <Link to="/reading-list" className="nav-link">Reading List</Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/search" className="nav-link">Search</Link>
          <Link to="/reading-list" className="nav-link">Reading List</Link>
        </>
      );
    };
  };

  return (
    <header className="header">
      <h1 className="header-title">Book World</h1>
      <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
        {renderNavLinks()}
      </nav>
      <button className="menu-toggle" onClick={toggleMenu}>
        &#x22EE;
      </button>
    </header>
  );
};
export default Header;
