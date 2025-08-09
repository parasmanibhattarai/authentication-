const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRoutes = require('./Routes/AuthRoutes');
const ProductsRoutes = require('./Routes/ProductRoutes'); // Uncomment if you have product routes  


require('dotenv').config();
require('./Models/db'); // Ensure the User model is imported to establish the connection


const app = express();
const PORT = process.env.PORT || 4001;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

//test
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Middleware
app.use(cors());



// Routes
app.use('/auth', AuthRoutes);
app.use('/products',ProductsRoutes ); // Assuming you have a productsRoutes file for product-related routes


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});