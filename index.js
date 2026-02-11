const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');

const customer_routes = require('./auth_users.js').authenticated;
const genl_routes = require('./general.js').general;
const booksdb = require('./booksdb.js');

const app = express();
app.use(express.json());

// Serve booksdb.js as JSON endpoint
app.get('/api/books', (req, res) => {
  res.json(booksdb);
});

// Session middleware
app.use("/customer", session({
  secret: "fingerprint_customer",
  resave: true,
  saveUninitialized: true
}));

// Authentication middleware for /customer/auth/*
app.use("/customer/auth/*", (req, res, next) => {
  if (!req.session.user) return res.status(401).json({ message: "User not authenticated" });
  next();
});

// Routes
app.use("/customer", customer_routes);
app.use("/", genl_routes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
