const mongoose = require('mongoose');
// Connect to MongoDB
const dbURI = process.env.MONGO_URI; // Replace with your MongoDB URI

mongoose.connect(dbURI).then(() => {console.log('Connected to MongoDB');}).catch((err) => {console.error('MongoDB connection error:', err);});




