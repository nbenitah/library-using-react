
import React from 'react';
import { Link } from 'react-router-dom';
import UndrawBooks from '../Undraw_Books.svg';

// ...existing code...

const  Landing = () => {
    return (
        <section id="landing">
            <header>
                <div className="header__container">
                    <div className="header__description">
                        <h1>Australia's most awarded online library platform</h1>
                        <h2> Find your dream book with <span className="purple">Library</span></h2>
                        <Link to="/books" className="btn">Browse books</Link>
                        </div>
                    <div className="header__img--wrapper">
                
                        <img src={UndrawBooks} alt="Landing" />

                        
                    </div>
                </div>
            </header>
        </section>
    );
};
export default Landing;