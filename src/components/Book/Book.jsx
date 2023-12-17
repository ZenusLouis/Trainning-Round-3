import React, { Component } from 'react';
import './Book.css';
class Book extends Component {
  render() {
    const { book, onShelfChange } = this.props;
    const authors = book.authors || [];

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${book.imageLinks.thumbnail}")`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select onChange={(e) => onShelfChange(book, e.target.value)} value={book.shelf || 'none'}>
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{authors.join(', ')}</div>
      </div>
    );
  }
}

export default Book;
