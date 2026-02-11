const express = require('express');
const axios = require('axios');
const public_users = express.Router();

const BOOKS_API = "http://localhost:5000/api/books"; // points to main server route

// Get all books
public_users.get('/', async (req, res) => {
  try {
    const response = await axios.get(BOOKS_API);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books", error: error.message });
  }
});

// Get book by ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  try {
    const response = await axios.get(BOOKS_API);
    const book = response.data[isbn];
    if (book) return res.status(200).json(book);
    return res.status(404).json({ message: "Book not found" });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book by ISBN", error: error.message });
  }
});

// Get books by author
public_users.get('/author/:author', async (req, res) => {
  const author = req.params.author;
  try {
    const response = await axios.get(BOOKS_API);
    const filteredBooks = Object.values(response.data).filter(book => book.author === author);
    if (filteredBooks.length > 0) return res.status(200).json(filteredBooks);
    return res.status(404).json({ message: "No books found for this author" });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by author", error: error.message });
  }
});

// Get books by title
public_users.get('/title/:title', async (req, res) => {
  const title = req.params.title;
  try {
    const response = await axios.get(BOOKS_API);
    const filteredBooks = Object.values(response.data).filter(book => book.title === title);
    if (filteredBooks.length > 0) return res.status(200).json(filteredBooks);
    return res.status(404).json({ message: "No books found for this title" });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by title", error: error.message });
  }
});

// Get book reviews
public_users.get('/review/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  try {
    const response = await axios.get(BOOKS_API);
    const book = response.data[isbn];
    if (book) return res.status(200).json(book.reviews);
    return res.status(404).json({ message: "Book not found" });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book reviews", error: error.message });
  }
});

module.exports.general = public_users;
