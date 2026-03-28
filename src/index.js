import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faShoppingCart,
  faClose,
  faBolt,
  faBookOpen,
  faTags,
  faStar,
  faStarHalfStroke,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faBars,
  faShoppingCart,
  faClose,
  faBolt,
  faBookOpen,
  faTags,
  faStar,
  faStarHalfStroke
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();