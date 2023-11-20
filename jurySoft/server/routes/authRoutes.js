const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secretKey = 'yourSecretKey'; // Replace with your secret key

// Login route - generate JWT token with roles
router.post('/login', (req, res) => {
  // Assuming authentication is successful
  const { username, role } = req.body;

  // For simplicity, let's assume the role is passed during login
  const user = { username, role }; // You can add more user info here

  const token = jwt.sign(user, secretKey);
  res.json({ token });
});

module.exports = router;
