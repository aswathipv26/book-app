import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './components.css';

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    };
  };

  return (
    <div className='search-bar'>
        <input 
        type='text'
        placeholder='search for books'
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        className='search-input'
        />
        <button className='search-btn' onClick={handleSearch}>Search</button>
        
    </div>
  );
};

export default SearchBar;