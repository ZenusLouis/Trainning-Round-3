import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Book from "../components/Book/Book";
import Bookshelf from "../components/Bookshelf/Bookshelf";
import SearchBar from "../components/Search/SearchBar";
import * as BooksAPI from "../API/BooksAPI";
import "./App.css";

const shelfTypes = [
  { title: "Currently Reading", shelf: "currentlyReading" },
  { title: "Want to Read", shelf: "wantToRead" },
  { title: "Read", shelf: "read" },
];

function App() {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const fetchedBooks = await BooksAPI.getAll();
      setBooks(fetchedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleShelfChange = async (book, shelf) => {
    try {
      await BooksAPI.update(book, shelf);
      fetchBooks();
    } catch (error) {
      console.error("Error updating shelf:", error);
    }
  };

  const handleSearch = async (query) => {
    try {
      if (query) {
        const searchResults = await BooksAPI.search(query);
        if (!searchResults.error) {
          setSearchResults(searchResults);
        } else {
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching books:", error);
      setSearchResults([]);
    }
  };

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
                  {shelfTypes.map((shelfType) => (
                    <Bookshelf
                      key={shelfType.shelf}
                      title={shelfType.title}
                      books={books.filter(
                        (book) => book.shelf === shelfType.shelf
                      )}
                      onShelfChange={handleShelfChange}
                    />
                  ))}
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
                <SearchBar onSearch={handleSearch} />
                <div className="search-books-results">
                  <Bookshelf
                    title="Search Results"
                    books={searchResults}
                    onShelfChange={handleShelfChange}
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

export default App;
