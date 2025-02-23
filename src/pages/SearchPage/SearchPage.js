import React,{useState} from 'react';
import './SearchPage.css';
import BookCard from '../../components/BookCard';

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [readingList, setReadingList] = useState(
    JSON.parse(localStorage.getItem('readingList')) || []
  );

  const [selectedBook, setSelectedBook] = useState(null);
  const [description, setDescription] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchBooks = async () => {
    if (!searchQuery) return; // Don't fetch if searchQuery is empty
    setLoading(true);
    setError('');

    const url = `https://openlibrary.org/search.json?q=${searchQuery}`;

    try {
      const response = await fetch(url);
      
      const data = await response.json();
      if (data.docs && data.docs.length > 0){
        const booksData =  data.docs.map((book) => ({
          id: book.key,
          title: book.title,
          authors: book.author_name?.join(', ') || 'Unknown Author',
          cover: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : 'https://via.placeholder.com/150',
          first_publish_year: book.first_publish_year || 'N/A',
        }))
        setBooks(booksData);
      } else {
        setError('No books found.');
      };
    } catch (err){
      setError('Something went wrong. Please try again later')
    }finally{
      setLoading(false);
    };
  };


  const fetchBookDetails = async (book) => {
    try {
      const response = await fetch(`https://openlibrary.org${book.id}.json`);
      const data = await response.json();
      setDescription(data.description?.value || data.description || 'No description available.');
    } catch (err) {
      setDescription('Failed to load description.');
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchBooks();
  };

  const handleAddToReadingList = (book) => {
    if (!readingList.some((b) => b.id === book.id)) {
      const updatedList = [...readingList, book];
      setReadingList(updatedList);
      localStorage.setItem('readingList', JSON.stringify(updatedList));
    } else {
      alert('This book is already in your Reading List!');
    };
  };

  const handleViewDetails = (book) => {
    setSelectedBook(book); 
    fetchBookDetails(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null); 
  };

  return (
    <div className="searchpage-container">
      <h1>Book Search</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for books..."
          value={searchQuery}
          onChange={handleInputChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {books.length > 0 && (
        <div className="books-list">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onAddToReadingList={handleAddToReadingList}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}

<h2>Reading List</h2>
<div className="reading-list">
  {readingList.map((book) => (
    <div className="reading-list-item" key={book.id}>
      <img
        src={book.cover}
        alt={book.title}
        className="reading-list-thumbnail"
      />
      <div>
        <h3>{book.title}</h3>
        <p>{book.authors}</p>
        <p>{book.first_publish_year}</p>
      </div>
    </div>
  ))}
  </div>

     {selectedBook && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={handleCloseModal}>
              &times;
            </button>
            <h2>{selectedBook.title}</h2>
            <img
                src={selectedBook.cover}
                alt={selectedBook.title}
            />
             <p><strong>Authors:</strong> {selectedBook.authors}</p>
             <p><strong>First Published:</strong> {selectedBook.first_publish_year}</p>
             <div className="book-description">
            <strong>Description:</strong>
            <p className="scrollable-description">{description}</p>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;