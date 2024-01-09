import React from 'react';
import Book from '../Book/Book';
import './Bookshelf.css';

function Bookshelf(props) {
    const { title, books, onShelfChange } = props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book book={book} onShelfChange={onShelfChange} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

export default Bookshelf;
