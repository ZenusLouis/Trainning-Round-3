import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './Search.css';

function SearchBar(props) {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    props.onSearch(newQuery);
  };

  return (
    <div className="search-books-bar">
      <Link to="/" className="close-search" onClick={props.onCloseSearch}>
        Close
      </Link>
      <div className="search-books-input-wrapper">
        <form>
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={handleChange}
          />
        </form>
      </div>
    </div>
  );
}

export default SearchBar;