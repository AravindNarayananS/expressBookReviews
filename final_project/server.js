const express = require('express');
const books = require("./booksdb.js"); // keep original file
const app = express();

// This route exposes books as JSON
app.get('/api/books', (req, res) => {
  res.json(books);
});

app.listen(3000, () => console.log("Server running on port 3000"));
