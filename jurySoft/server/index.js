const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js');
const protectedRoutes = require('./routes/protectedRoutes');


app.use(cors());

app.use(express.json());

app.use('/auth', authRoutes); // Routes for authentication (login)
app.use('/protected', protectedRoutes); // Protected routes

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
