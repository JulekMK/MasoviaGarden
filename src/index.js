import React from 'react';
import ReactDOM from 'react-dom/client';  // Używaj 'react-dom/client' zamiast 'react-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Utworzenie root'a za pomocą ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderowanie aplikacji
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Opcjonalnie: mierzenie wydajności aplikacji
reportWebVitals();
