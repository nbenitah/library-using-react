import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';

const Book = ({ book }) => {
  const [img, setImg] = useState();
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    setImg(undefined);

    const image = new Image();
    image.src = book.url;
    image.onload = () => {
      setTimeout(() => {
        if (mountedRef.current) {
          setImg(image);
        }
      }, 250);
    };

    return () => {
      mountedRef.current = false;
    };
  }, [book.url]);

  const fullStars = Math.floor(book.rating);
  const hasHalfStar = book.rating % 1 !== 0;

  if (!img) {
    return (
      <div className="book">
        <div className="book__img--skeleton"></div>
        <div className="skeleton book__title--skeleton"></div>
        <div className="skeleton book__rating--skeleton"></div>
        <div className="skeleton book__price--skeleton"></div>
      </div>
    );
  }

  return (
    <Link to={`/books/${book.id}`} className="book book__link">
        <figure className="book__img--wrapper">
          <img src={img.src} alt={book.title} className="book__img" />
        </figure>

        <div className="book__title">
          <span className="book__title--link">{book.title}</span>
        </div>

        <div className="book__ratings">
          {new Array(fullStars).fill(0).map((_, index) => (
            <FontAwesomeIcon
              key={index}
              icon={faStar}
              className="book__rating--icon"
            />
          ))}
          {hasHalfStar && (
            <FontAwesomeIcon icon={faStarHalfStroke} className="book__rating--icon" />
          )}
        </div>

        <div className="book__price">
          {book.salePrice ? (
            <>
              <span className="book__price--normal">
                ${book.originalPrice.toFixed(2)}
              </span>{' '}
              ${book.salePrice.toFixed(2)}
            </>
          ) : (
            <span className="book__price--normal">
              ${book.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
    </Link>
  );
};

export default Book;