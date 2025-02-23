import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import ReadingList from './pages/ReadingList/ReadingList';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={< HomePage/>} />
        <Route path='/book-app' element={< HomePage/>} />
        <Route path='/search' element={< SearchPage/>} />
        <Route path='/reading-list' element={< ReadingList/>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
