import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Nav from './components/Nav.jsx';
import Home from './Pages/Home.jsx';
import Books from './Pages/Books.jsx';
import BookInfo from './Pages/BookInfo.jsx';
import Cart from './Pages/Cart.jsx';
import Footer from './assets/Components/Footer.jsx';
import { books } from './assets/data.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books books={books} />} />
          <Route path="/books/:id" element={<BookInfo />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
