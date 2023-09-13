const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;
const MONGODB_URI="mongodb+srv://weather:weather_app99@cluster0.55vrtjq.mongodb.net/?retryWrites=true&w=majority"

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// routes and middleware 


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
