import "./App.css";
import React, {Component} from "react";
import Book from "../components/Book/Book";
import Bookshelf from "../components/Bookshelf/Bookshelf";
import * as BooksAPI from "../API/BooksAPI";
import SearchBar from '../components/Search/SearchBar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

class App extends Component {
  state = {
    books: [],
    searchResults: [],
  };

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = async () => {
    try {
      const books = await BooksAPI.getAll();
      this.setState({ books });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  handleShelfChange = async (book, shelf) => {
    try {
      await BooksAPI.update(book, shelf);
      this.fetchBooks();
    } catch (error) {
      console.error("Error updating shelf:", error);
    }
  };
  

  handleSearch = async (query) => {
    try {
      if (query) {
        const searchResults = await BooksAPI.search(query);
        if (!searchResults.error) {
          this.setState({ searchResults });
        } else {
          this.setState({ searchResults: [] });
        }
      } else {
        this.setState({ searchResults: [] });
      }
    } catch (error) {
      console.error("Error searching books:", error);
      this.setState({ searchResults: [] });
    }
  };

  render() {
    const { books, searchResults } = this.state;

    return (
      <Router>
        <div className="app">
          <Routes>
            <Route
              path="/"
              element={
                <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                    <Bookshelf
                      title="Currently Reading"
                      books={books.filter(
                        (book) => book.shelf === "currentlyReading"
                      )}
                      onShelfChange={this.handleShelfChange}
                    />
                    <Bookshelf
                      title="Want to Read"
                      books={books.filter((book) => book.shelf === "wantToRead")}
                      onShelfChange={this.handleShelfChange}
                    />
                    <Bookshelf
                      title="Read"
                      books={books.filter((book) => book.shelf === "read")}
                      onShelfChange={this.handleShelfChange}
                    />
                  </div>
                  <div className="open-search">
                    <Link to="/search">Add a book</Link>
                  </div>
                </div>
              }
            />
            <Route
              path="/search"
              element={
                <div className="search-books">
                  <SearchBar
                    onSearch={this.handleSearch}
                  />
                  <div className="search-books-results">
                    <Bookshelf
                      title="Search Results"
                      books={searchResults}
                      onShelfChange={this.handleShelfChange}
                    />
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;