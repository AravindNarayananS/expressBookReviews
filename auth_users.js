const express = require('express');
const session = require('express-session');
const users = [];
const authenticated = express.Router();

// Register new user
authenticated.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Username and password required" });

  const exists = users.find(u => u.username === username);
  if (exists) return res.status(400).json({ message: "User already exists" });

  users.push({ username, password });
  return res.status(200).json({ message: "User registered successfully" });
});

// Login
authenticated.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  req.session.user = user;
  return res.status(200).json({ message: "Login successful" });
});

module.exports = { authenticated, users };
