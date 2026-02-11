const express = require('express');
const public_users = express.Router();
let books = require("./booksdb.js");
let users = [];

// Register new user
public_users.post("/register", (req,res) => {
  const { username, password } = req.body;

  if (username && password) {
    let exists = users.find(user => user.username === username);
    if (!exists) {
      users.push({ username, password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get all books
public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});

// Get book by ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    return res.status(200).json(book);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Get books by author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const filteredBooks = Object.values(books).filter(book => book.author === author);

  if (filteredBooks.length > 0) {
    return res.status(200).json(filteredBooks);
  } else {
    return res.status(404).json({ message: "No books found for this author" });
  }
});

// Get books by title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const filteredBooks = Object.values(books).filter(book => book.title === title);

  if (filteredBooks.length > 0) {
    return res.status(200).json(filteredBooks);
  } else {
    return res.status(404).json({ message: "No books found for this title" });
  }
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    return res.status(200).json(book.reviews);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;
