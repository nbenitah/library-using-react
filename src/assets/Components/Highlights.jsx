import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faBookOpen, faTags } from '@fortawesome/free-solid-svg-icons';

const Highlight = ({ icon, title, para }) => {
  return (
    <div className="highlight">
      <div className="highlight__img">{icon}</div>
      <h3 className="highlight__subtitle">{title}</h3>
      <p className="highlight__para">{para}</p>
    </div>
  );
};

const Highlights = () => {
  return (
    <section id="highlights">
      <div className="container">
        <div className="row">
          <h2 className="section__title">
            Why choose <span className="purple">Library</span>?
          </h2>

          <div className="highlight__wrapper">
            <Highlight
              icon={<FontAwesomeIcon icon={faBolt} />}
              title="Easy and Quick"
              para="Get access to the book you purchased online immediately after checkout."
            />

            <Highlight
              icon={<FontAwesomeIcon icon={faBookOpen} />}
              title="10,000+ Books"
              para="Library has books in all favourite categories."
            />

            <Highlight
              icon={<FontAwesomeIcon icon={faTags} />}
              title="Affordable"
              para="Get your hands on popular books for as little as $10.00."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;