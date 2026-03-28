import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../logo.svg"; // ✅ fixed path

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row row__column">
                    <Link to="/">
                    <figure className="footer__logo">
                        <img src={Logo} className="footer__logo--img" alt="" />
                    </figure>
                    </Link>
                    <div className="footer__list">
                        <Link to="/" className="footer__list--link">Home</Link>
                        <Link to="/books" className="footer__list--link">Books</Link>
                        <Link to="/about" className="footer__list--link">About</Link>
                        <Link to="/contact" className="footer__list--link">Contact</Link>
                        <Link to="/cart" className="footer__list--link">Cart</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;