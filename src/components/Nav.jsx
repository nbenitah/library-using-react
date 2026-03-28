import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faCartShopping,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import LibraryLogo from '../assets/Library.svg';

const CART_KEY = 'cart';

const Nav = () => {
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  const openMenu = () => {
    document.body.classList.add('menu--open');
  };

  const closeMenu = () => {
    document.body.classList.remove('menu--open');
  };

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  useEffect(() => {
    const updateCount = () => {
      const raw = localStorage.getItem(CART_KEY);
      try {
        const parsed = raw ? JSON.parse(raw) : [];
        const items = Array.isArray(parsed) ? parsed : [];
        const count = items.reduce(
          (sum, item) => sum + Math.max(0, Number(item?.quantity || 0)),
          0
        );
        setCartCount(count);
      } catch {
        setCartCount(0);
      }
    };

    updateCount();
    window.addEventListener('storage', updateCount);
    window.addEventListener('cart-updated', updateCount);

    return () => {
      window.removeEventListener('storage', updateCount);
      window.removeEventListener('cart-updated', updateCount);
    };
  }, []);

  return (
    <nav>
      <div className="nav__container">
        <Link to="/">
          <img src={LibraryLogo} alt="Library logo" className="logo" />
        </Link>

        <ul className="nav__links">
          <li className="nav__list">
            <Link to="/" className="nav__link" onClick={closeMenu}>Home</Link>
          </li>
          <li className="nav__list">
            <Link to="/books" className="nav__link" onClick={closeMenu}>Books</Link>
          </li>

          <button className="btn__menu" type="button" onClick={openMenu}>
            <FontAwesomeIcon icon={faBars} />
          </button>

          <li className="nav__icon">
            <Link to="/cart" className="nav__link" onClick={closeMenu}>
              <FontAwesomeIcon icon={faCartShopping} />
            </Link>
            <span className="cart__length">{cartCount}</span>
          </li>
        </ul>

        <div className="menu__backdrop">
          <button className="btn__menu btn__menu--close" type="button" onClick={closeMenu}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <ul className="menu__links">
            <li className="menu__list">
              <Link to="/" className="menu__link" onClick={closeMenu}>Home</Link>
            </li>
            <li className="menu__list">
              <Link to="/books" className="menu__link" onClick={closeMenu}>Books</Link>
            </li>
            <li className="menu__list">
              <Link to="/cart" className="menu__link" onClick={closeMenu}>Cart</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;