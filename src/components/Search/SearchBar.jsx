import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import './Search.css';
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  handleChange = (event) => {
    const newQuery = event.target.value;
    this.setState({ query: newQuery });
    this.props.onSearch(newQuery);
  };

  render() {
    return (
      <div className="search-books-bar">
        <Link to="/" className="close-search" onClick={this.props.onCloseSearch}>
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <form>
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              value={this.state.query}
              onChange={this.handleChange}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default SearchBar;

