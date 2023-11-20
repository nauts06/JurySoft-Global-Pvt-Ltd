const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secretKey = 'yourSecretKey'; // Replace with your secret key

// Middleware to authenticate the JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

// Middleware to check roles
function checkRole(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.sendStatus(403);
    }
  };
}

// Protected route for superAdmin
router.get('/superAdmin', authenticateToken, checkRole('superAdmin'), (req, res) => {
  res.json({ message: 'Welcome, Super Admin!' });
});

// Protected route for admin
router.get('/admin', authenticateToken, checkRole('admin'), (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

// Protected route for executive
router.get('/executive', authenticateToken, checkRole('executive'), (req, res) => {
  res.json({ message: 'Welcome, Executive!' });
});

module.exports = router;
