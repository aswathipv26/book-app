import React from 'react';
import './components.css';

function BookCard({book, onAddToReadingList, onViewDetails }) {
  const {title, authors, cover} = book;

  return (
    <div className='book-card'>
        <img src= {cover || 'https://via.placeholder.com/150'} 
        className='book-card-image' 
        alt={title}
        onClick={() => onViewDetails(book)}
        />
        <div className='book-card-info'>
            <h3 className='book-card-title'>{title}</h3>
            <p className='book-card-author'>{authors}</p>
            <button className='book-card-btn' onClick={() => onAddToReadingList(book)}>Add to Reading List</button>
        </div>
    </div>
  );
};

export default BookCard;