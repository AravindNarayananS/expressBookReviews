const express = require('express');
const axios = require('axios'); // Axios for HTTP requests
const public_users = express.Router(); // Router instance

let users = [];

// Simulated API endpoint for books
const books = require('./booksdb.js');
const BOOKS_API = "http://localhost:5000/api/books"; // adjust if needed
module.exports.general = public_users;
