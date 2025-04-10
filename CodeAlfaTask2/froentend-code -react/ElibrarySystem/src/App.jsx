import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/library';

function App() {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', category: '' });

  useEffect(() => {
    fetchBooks();
    fetchBorrowedBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${API_URL}/books`);
      setBooks(res.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchBorrowedBooks = async () => {
    try {
      const res = await axios.get(`${API_URL}/showBorrowedBooks`);
      console.log("Borrowed books fetched:", res.data);  // Debug log
      setBorrowedBooks(res.data);
    } catch (error) {
      console.error("Error fetching borrowed books:", error);
    }
  };

  const borrowBook = async (title) => {
    try {
      await axios.post(`${API_URL}/borrow/${encodeURIComponent(title)}`);
      fetchBooks();
      fetchBorrowedBooks();
    } catch (error) {
      console.error("Error borrowing book:", error);
    }
  };

  const returnBook = async (title) => {
    try {
      await axios.post(`${API_URL}/return/${encodeURIComponent(title)}`);
      fetchBooks();
      fetchBorrowedBooks();
    } catch (error) {
      console.error("Error returning book:", error);
    }
  };

  const addBook = async () => {
    if (newBook.title && newBook.author && newBook.category) {
      try {
        await axios.post(`${API_URL}/save`, newBook);
        fetchBooks();
        setNewBook({ title: '', author: '', category: '' });
      } catch (error) {
        console.error("Error adding book:", error);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <h1 className="text-4xl font-bold text-center text-teal-600 mb-10">📚 E-Library System</h1>

      {/* Add New Book */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-10">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">➕ Add New Book</h2>
        <div className="flex space-x-4 mb-4 ">
          <input
            type="text"
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          />
          <input
            type="text"
            placeholder="Category"
            value={newBook.category}
            onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <button
          onClick={addBook}
          className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition duration-300"
        >
          Save Book
        </button>
      </div>

      {/* All Books */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-10 overflow-x-auto">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">📖 All Books</h2>
        <table className="min-w-full table-auto">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Author</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-b">
                <td className="px-4 py-2">{book.title}</td>
                <td className="px-4 py-2">{book.author}</td>
                <td className="px-4 py-2">{book.category}</td>
                <td className={`px-4 py-2 ${book.borrowed ? 'text-red-500' : 'text-green-500'}`}>
                  {book.borrowed ? 'Borrowed' : 'Available'}
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => borrowBook(book.title)}
                    disabled={book.borrowed}
                    className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 disabled:bg-gray-400 transition duration-300"
                  >
                    Borrow
                  </button>
                  <button
                    onClick={() => returnBook(book.title)}
                    disabled={!book.borrowed}
                    className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 disabled:bg-gray-400 transition duration-300"
                  >
                    Return
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Borrowed Books */}
      <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">📦 Borrowed Books</h2>
        {borrowedBooks.length === 0 ? (
          <p className="text-gray-500">No borrowed books available.</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Author</th>
                <th className="px-4 py-2 text-left">Category</th>
              </tr>
            </thead>
            <tbody>
              {borrowedBooks.map((book) => (
                <tr key={book.id} className="border-b">
                  <td className="px-4 py-2">{book.title}</td>
                  <td className="px-4 py-2">{book.author}</td>
                  <td className="px-4 py-2">{book.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
