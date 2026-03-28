import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { books } from '../assets/data';
import Price from '../components/Price.jsx';
import Rating from '../components/Rating.jsx';
import Book from '../assets/Components/Book.jsx';

const CART_KEY = 'cart';

const BookInfo = () => {
  const { id } = useParams();
  const book = books.find((entry) => String(entry.id) === String(id));
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    if (!book) return;

    const rawCart = localStorage.getItem(CART_KEY);
    let cart = [];

    try {
      cart = rawCart ? JSON.parse(rawCart) : [];
    } catch {
      cart = [];
    }

    const existingBook = cart.find((item) => String(item.id) === String(book.id));

    if (existingBook) {
      existingBook.quantity += 1;
    } else {
      cart.push({
        id: book.id,
        title: book.title,
        url: book.url,
        price: Number(book.salePrice ?? book.originalPrice),
        quantity: 1,
      });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  if (!book) {
    return (
      <div id="books__body">
        <main id="books__main">
          <div className="books__container">
            <div className="row">
              <h2>Book not found</h2>
              <Link to="/books" className="book__link">
                ← Back to Books
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div id="books__body">
      <main id="books__main">
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <Link to="/books" className="book__link">
                <span className="book__selected--title--top">← Back to Books</span>
              </Link>
            </div>

            <div className="book__selected">
              <figure className="book__selected--figure">
                <img src={book.url} alt={book.title} className="book__selected--img" />
              </figure>

              <div className="book__selected--description">
                <h2 className="book__selected--title">{book.title}</h2>
                <Rating rating={book.rating} />
                <Price salePrice={book.salePrice} originalPrice={book.originalPrice} />

                <button type="button" className="btn" style={{ marginTop: '16px' }} onClick={addToCart}>
                  {added ? 'Added!' : 'Add to Cart'}
                </button>

                <div className="book__summary">
                  <h3 className="book__summary--title">Summary</h3>
                  <p className="book__summary--para">
                    Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit.
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <p className="book__summary--para">
                    Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit.
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="books__container">
          <div className="row">
            <h2 className="section__title">Recommended Books</h2>
            <div className="books">
              {books
                .filter((b) => b.rating >= 5 && +b.id !== +id)
                .slice(0, 4)
                .map((recBook) => (
                  <Book key={recBook.id} book={recBook} />
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookInfo;