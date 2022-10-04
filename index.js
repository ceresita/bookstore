import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import BookView from './BookView';
import CreateBookView from './CreateBookView';
import CreateAuthorView from './CreateAuthorView';
import AuthorView from './AuthorView';
import BookListView from './BookListView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/books" element={<BookListView />} />
        <Route path="/books/:id" element={<BookView />} />
        <Route path="/books/create" element={<CreateBookView />} />
        <Route path="/" element={<App />} />
        <Route path="/authors/create" element={<CreateAuthorView />} />
        <Route path="/authors/:id" element={<AuthorView />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();