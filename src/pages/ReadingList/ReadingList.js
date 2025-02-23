import React,{useEffect, useState} from 'react';
import './ReadingList.css';

function ReadingList() {
  const [readingList, setReadingList] = useState([]);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem('readingList')) || [];
    setReadingList(savedList);
  }, []);

  const removeBook = (id) => {
    const updatedList = readingList.filter((book) => book.id !== id);
    setReadingList(updatedList);
    localStorage.setItem('readingList', JSON.stringify(updatedList));
  };

  return (
    <div className='readinglist-container'>
      <h1 className='readinglist-title'>My Reading List</h1>
      {readingList.length > 0 ? (
        readingList.map((book) => (
      <div key={book.id} className="readinglist-card">
            <img
              src={book.cover || 'https://via.placeholder.com/150'}
              alt={book.title}
              className="readinglist-image"
            />
            <div className='readinglist-details'>
            <h3 className="readinglist-title">{book.title}</h3>
            <p className="readinglist-authors">{book.authors}</p>
              <p className="readinglist-year">
                First Published: {book.first_publish_year || 'N/A'}
              </p>
            </div>
            <button
              className="remove-button"
              onClick={() => removeBook(book.id)}
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p>Your reading list is empty!</p>
      )}

    </div>
  );
};

export default ReadingList;